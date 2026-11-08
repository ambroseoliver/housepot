from io import BytesIO

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from PIL import Image
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from properties.models import Property

User = get_user_model()


def image_upload(name="home.png"):
    file = BytesIO()
    Image.new("RGB", (4, 4), color="green").save(file, format="PNG")
    return SimpleUploadedFile(name, file.getvalue(), content_type="image/png")


class PropertyApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.owner = User.objects.create_user(
            email="owner@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Omar Owner",
            role=User.Role.LANDLORD,
        )
        self.other_owner = User.objects.create_user(
            email="other@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Olive Other",
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

    def authenticate(self, user):
        access = AccessToken.for_user(user)
        access["token_version"] = user.token_version
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

    def create_listing(self, owner=None, title="Sunny home"):
        return Property.objects.create(
            owner=owner or self.owner,
            title=title,
            description="A bright, spacious home in a friendly neighbourhood.",
            location="Kilimani, Nairobi",
            property_type=Property.PropertyType.APARTMENT,
            listing_type=Property.ListingType.RENT,
            price=45000,
            bedrooms=2,
            bathrooms=1,
            status=Property.Status.PUBLISHED,
        )

    def test_frontend_listing_payload_creates_visible_pending_property_and_image(self):
        self.authenticate(self.owner)
        response = self.client.post(
            "/api/listings/",
            {
                "title": "Sunny home",
                "location": "Kilimani, Nairobi",
                "property_type": "apartment",
                "monthly_rent": "45000",
                "bedrooms": "2",
                "bathrooms": "1",
                "description": "A bright, spacious home in a friendly neighbourhood.",
                "image": image_upload(),
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, 201, response.data)
        property_obj = Property.objects.get(pk=response.data["id"])
        self.assertEqual(property_obj.owner, self.owner)
        self.assertEqual(property_obj.price, 45000)
        self.assertEqual(property_obj.status, Property.Status.PENDING)
        self.assertEqual(str(response.data["monthly_rent"]), "45000.00")
        self.assertTrue(response.data["cover_image"].endswith(".png"))
        self.assertEqual(len(response.data["images"]), 1)

        self.client.credentials()
        public_listings = self.client.get("/api/listings/")
        self.assertEqual(public_listings.status_code, 200)
        self.assertEqual(public_listings.data["count"], 1)
        self.assertEqual(public_listings.data["results"][0]["id"], property_obj.pk)

        self.authenticate(self.owner)
        self.assertEqual(self.client.get("/api/listings/mine/").data["count"], 1)

    def test_versioned_route_and_draft_workflow(self):
        self.authenticate(self.owner)
        response = self.client.post(
            "/api/v1/listings/",
            {
                "title": "Draft home",
                "location": "Westlands, Nairobi",
                "property_type": "apartment",
                "monthly_rent": "50000",
                "bedrooms": "1",
                "bathrooms": "1",
                "description": "A bright home saved as a draft for later review.",
                "status": "draft",
                "image": image_upload(),
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(response.data["status"], "draft")

        schema = self.client.get("/api/schema/")
        self.assertEqual(schema.status_code, 200)

    def test_listing_requires_owner_role_and_an_image(self):
        self.authenticate(self.tenant)
        response = self.client.post(
            "/api/listings/",
            {
                "title": "Tenant listing",
                "location": "Nairobi",
                "property_type": "apartment",
                "monthly_rent": "45000",
                "bedrooms": "2",
                "bathrooms": "1",
                "description": "A sufficiently long property description.",
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, 403)

        self.authenticate(self.owner)
        missing_image = self.client.post(
            "/api/listings/",
            {
                "title": "Missing photo",
                "location": "Nairobi",
                "property_type": "apartment",
                "monthly_rent": "45000",
                "bedrooms": "2",
                "bathrooms": "1",
                "description": "A sufficiently long property description.",
            },
            format="multipart",
        )
        self.assertEqual(missing_image.status_code, 400)

    def test_only_staff_can_approve_and_listing_search_is_filtered(self):
        property_obj = self.create_listing()
        admin_client = APIClient()
        access = AccessToken.for_user(self.admin)
        access["token_version"] = self.admin.token_version
        admin_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = admin_client.post(f"/api/listings/{property_obj.pk}/approve/")
        self.assertEqual(response.status_code, 200)

        self.client.credentials()
        listings = self.client.get(
            "/api/listings/?location=kilimani&max_price=50000&property_type=apartment"
        )
        self.assertEqual(listings.status_code, 200)
        self.assertEqual(listings.data["count"], 1)
        self.assertEqual(listings.data["results"][0]["title"], property_obj.title)

    def test_owner_cannot_modify_another_owners_listing(self):
        property_obj = self.create_listing()
        self.authenticate(self.other_owner)
        response = self.client.patch(
            f"/api/listings/{property_obj.pk}/",
            {"title": "Taken over"},
            format="json",
        )
        self.assertEqual(response.status_code, 403)
        property_obj.refresh_from_db()
        self.assertEqual(property_obj.title, "Sunny home")

    def test_invalid_upload_is_rejected(self):
        self.authenticate(self.owner)
        response = self.client.post(
            "/api/listings/",
            {
                "title": "Bad upload",
                "location": "Nairobi",
                "property_type": "apartment",
                "monthly_rent": "45000",
                "bedrooms": "2",
                "bathrooms": "1",
                "description": "A sufficiently long property description.",
                "image": SimpleUploadedFile("bad.png", b"not an image", content_type="image/png"),
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, 400)
