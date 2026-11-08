from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver

from audit.services import record_event


@receiver(user_logged_in)
def audit_user_login(sender, request, user, **kwargs):
    record_event(
        actor=user,
        action="user.login",
        request=request,
        target_type="user",
        target_id=user.pk,
    )
