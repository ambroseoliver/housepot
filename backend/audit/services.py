from .models import AuditEvent


def record_event(
    *,
    actor=None,
    action,
    request=None,
    target_type="",
    target_id="",
    metadata=None,
):
    forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "") if request else ""
    ip_address = (
        forwarded_for.split(",", maxsplit=1)[0].strip()
        if forwarded_for
        else request.META.get("REMOTE_ADDR")
        if request
        else None
    )
    return AuditEvent.objects.create(
        actor=actor,
        action=action,
        target_type=target_type,
        target_id=str(target_id) if target_id else "",
        ip_address=ip_address,
        user_agent=request.META.get("HTTP_USER_AGENT", "")[:500] if request else "",
        metadata=metadata or {},
    )
