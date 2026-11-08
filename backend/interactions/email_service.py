import logging
from datetime import timedelta
from smtplib import SMTPException

from django.conf import settings
from django.core.mail import send_mail
from django.core.mail.message import BadHeaderError
from django.db import connection, transaction
from django.db.models import Q
from django.utils import timezone

from .models import EmailOutbox

logger = logging.getLogger(__name__)
MAX_ATTEMPTS = 5
LOCK_TIMEOUT = timedelta(minutes=5)


def send_or_queue_email(user, subject, body):
    if settings.EMAIL_OUTBOX_ENABLED:
        return EmailOutbox.objects.create(
            recipient=user.email,
            subject=subject,
            body=body,
            available_at=timezone.now(),
        )
    try:
        return send_mail(
            subject,
            body,
            None,
            [user.email],
            fail_silently=False,
        )
    except (OSError, SMTPException, BadHeaderError):
        logger.exception("Could not send notification email to user_id=%s", user.pk)
        return 0


def process_email_outbox(limit=100):
    sent = 0
    failed = 0
    for _ in range(limit):
        now = timezone.now()
        with transaction.atomic():
            query = EmailOutbox.objects.filter(
                Q(status=EmailOutbox.Status.PENDING, available_at__lte=now)
                | Q(status=EmailOutbox.Status.PROCESSING, locked_at__lte=now - LOCK_TIMEOUT)
            ).order_by("created_at")
            supports_skip_locked = connection.features.has_select_for_update_skip_locked
            message = query.select_for_update(skip_locked=supports_skip_locked).first()
            if message is None:
                break
            message.status = EmailOutbox.Status.PROCESSING
            message.attempts += 1
            message.locked_at = now
            message.save(update_fields=["status", "attempts", "locked_at"])

        try:
            delivered = send_mail(
                message.subject,
                message.body,
                None,
                [message.recipient],
                fail_silently=False,
            )
            if delivered != 1:
                raise SMTPException("The email backend did not confirm delivery.")
        except (OSError, SMTPException, BadHeaderError) as exc:
            if message.attempts >= MAX_ATTEMPTS:
                message.status = EmailOutbox.Status.FAILED
                failed += 1
            else:
                message.status = EmailOutbox.Status.PENDING
                message.available_at = now + timedelta(minutes=min(2**message.attempts, 60))
            message.last_error = type(exc).__name__
            message.locked_at = None
            message.save(update_fields=["status", "available_at", "last_error", "locked_at"])
            logger.exception("Email outbox delivery failed for message_id=%s", message.pk)
            continue

        message.status = EmailOutbox.Status.SENT
        message.sent_at = timezone.now()
        message.locked_at = None
        message.last_error = ""
        message.save(update_fields=["status", "sent_at", "locked_at", "last_error"])
        sent += 1

    return {"sent": sent, "failed": failed}
