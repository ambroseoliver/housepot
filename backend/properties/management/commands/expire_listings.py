from django.core.management.base import BaseCommand
from django.utils import timezone

from audit.services import record_event
from properties.models import Property


class Command(BaseCommand):
    help = "Archive published properties that have passed their expiry date."

    def handle(self, *args, **options):
        now = timezone.now()
        expired = Property.objects.filter(
            status=Property.Status.PUBLISHED,
            expires_at__lte=now,
        )
        count = expired.update(status=Property.Status.ARCHIVED, is_featured=False)
        unfeatured = Property.objects.filter(
            is_featured=True,
            featured_until__lte=now,
        ).update(is_featured=False)
        if count:
            record_event(
                action="property.expired",
                target_type="property",
                metadata={"count": count},
            )
        self.stdout.write(
            self.style.SUCCESS(
                f"Archived {count} expired listing(s); removed featured status from {unfeatured} listing(s)."
            )
        )
