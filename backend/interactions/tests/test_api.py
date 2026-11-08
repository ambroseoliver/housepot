from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase
from django.test.utils import override_settings
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from properties.models import Property
from interactions.email_service import process_email_outbox, send_or_queue_email
from interactions.models import EmailOutbox

User = get_user_model()


class InteractionApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.owner = User.objects.create_user(
            email="owner@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Omar Owner",
            role=User.Role.LANDLORD,
        )
        self.tenant = User.objects.create_user(
            email="tenant@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Tessa Tenant",
        )
        self.admin = User.objects.create_superuser(
            email="admin@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Admin Account",
        )
        self.property = Property.objects.create(
            owner=self.owner,
            title="Kilimani apartment",
            description="A comfortable apartment near local services and transport.",
            location="Kilimani, Nairobi",
            property_type=Property.PropertyType.APARTMENT,
            listing_type=Property.ListingType.RENT,
            price=60000,
            bedrooms=2,
            bathrooms=1,
            status=Property.Status.PUBLISHED,
        )

    def authenticate(self, user):
        access = AccessToken.for_user(user)
        access["token_version"] = user.token_version
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

    def test_favorites_are_private_and_duplicate_requests_are_idempotent(self):
        self.authenticate(self.tenant)
        first = self.client.post(
            "/api/favorites/",
            {"property_id": self.property.pk},
            format="json",
        )
        second = self.client.post(
            "/api/favorites/",
            {"property_id": self.property.pk},
            format="json",
        )
        self.assertEqual(first.status_code, 201)
        self.assertEqual(second.status_code, 201)
        self.assertEqual(self.client.get("/api/favorites/").data["count"], 1)

        self.client.credentials()
        self.assertEqual(self.client.get("/api/favorites/").status_code, 401)

    def test_owner_can_respond_to_inquiry_and_sender_receives_notification(self):
        self.authenticate(self.tenant)
        inquiry = self.client.post(
            "/api/inquiries/",
            {
                "property": self.property.pk,
                "message": "Is the apartment available for viewing next week?",
            },
            format="json",
        )
        self.assertEqual(inquiry.status_code, 201, inquiry.data)
        self.assertEqual(inquiry.data["contact_email"], self.tenant.email)

        self.authenticate(self.owner)
        response = self.client.patch(
            f"/api/inquiries/{inquiry.data['id']}/",
            {
                "status": "responded",
                "owner_response": "Yes, we can arrange a viewing next Tuesday.",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["status"], "responded")

        self.authenticate(self.tenant)
        notifications = self.client.get("/api/notifications/")
        self.assertEqual(notifications.status_code, 200)
        self.assertTrue(
            any(notification["kind"] == "inquiry.response" for notification in notifications.data["results"])
        )

    def test_reviews_are_moderated_and_unique_per_user(self):
        self.authenticate(self.tenant)
        payload = {
            "property": self.property.pk,
            "rating": 5,
            "body": "The property was accurately represented and the owner was helpful.",
        }
        review = self.client.post("/api/reviews/", payload, format="json")
        self.assertEqual(review.status_code, 201)
        self.assertEqual(review.data["status"], "pending")
        duplicate = self.client.post("/api/reviews/", payload, format="json")
        self.assertEqual(duplicate.status_code, 400)

        admin_client = APIClient()
        access = AccessToken.for_user(self.admin)
        access["token_version"] = self.admin.token_version
        admin_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        approved = admin_client.post(f"/api/reviews/{review.data['id']}/approve/")
        self.assertEqual(approved.status_code, 200)
        self.client.credentials()
        self.assertEqual(self.client.get("/api/reviews/").data["count"], 1)

    def test_report_requires_exactly_one_target_and_admin_can_resolve(self):
        self.authenticate(self.tenant)
        invalid = self.client.post(
            "/api/reports/",
            {"reason": "fraud"},
            format="json",
        )
        self.assertEqual(invalid.status_code, 400)
        report = self.client.post(
            "/api/reports/",
            {
                "reason": "fraud",
                "details": "The advertised property appears to be fraudulent.",
                "property": self.property.pk,
            },
            format="json",
        )
        self.assertEqual(report.status_code, 201)

        admin_client = APIClient()
        access = AccessToken.for_user(self.admin)
        access["token_version"] = self.admin.token_version
        admin_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        resolved = admin_client.patch(
            f"/api/reports/{report.data['id']}/",
            {"status": "resolved"},
            format="json",
        )
        self.assertEqual(resolved.status_code, 200)
        self.assertEqual(resolved.data["status"], "resolved")

    @override_settings(EMAIL_OUTBOX_ENABLED=True, EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
    def test_outbox_delivers_notification_email(self):
        queued = send_or_queue_email(
            self.owner,
            "A Housepot notification",
            "A renter sent an inquiry about your listing.",
        )
        self.assertEqual(queued.status, EmailOutbox.Status.PENDING)
        result = process_email_outbox(limit=10)
        queued.refresh_from_db()
        self.assertEqual(result, {"sent": 1, "failed": 0})
        self.assertEqual(queued.status, EmailOutbox.Status.SENT)
        self.assertEqual(len(mail.outbox), 1)
