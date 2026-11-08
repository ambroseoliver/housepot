from django.core.management.base import BaseCommand, CommandError

from interactions.email_service import process_email_outbox


class Command(BaseCommand):
    help = "Deliver queued notification emails and retry transient failures."

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=100)

    def handle(self, *args, **options):
        limit = options["limit"]
        if not 1 <= limit <= 1000:
            raise CommandError("--limit must be between 1 and 1000.")
        result = process_email_outbox(limit=limit)
        self.stdout.write(
            self.style.SUCCESS(
                f"Delivered {result['sent']} email(s); permanently failed {result['failed']}."
            )
        )
