import logging

from django.conf import settings
from django.core import signing
from django.core.mail import send_mail
from django.urls import reverse

logger = logging.getLogger(__name__)


def create_verification_token(user):
    return signing.dumps(
        {"user_id": user.pk, "email": user.email},
        salt="housepot.email-verification",
    )


def send_verification_email(user):
    token = create_verification_token(user)
    path = reverse("user-verify-email")
    link = f"{settings.FRONTEND_URL}/account?verification_token={token}"
    send_mail(
        subject="Welcome to Housepot — verify your email",
        message=(
            f"Welcome to Housepot, {user.full_name}.\n\n"
            "Verify your email address to secure your Housepot account. "
            f"Submit the token below to {path} within 24 hours:\n\n{token}\n\n"
            f"Account page: {link}"
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


def verification_payload(token):
    return signing.loads(
        token,
        salt="housepot.email-verification",
        max_age=settings.ACCOUNT_VERIFICATION_TIMEOUT,
    )
