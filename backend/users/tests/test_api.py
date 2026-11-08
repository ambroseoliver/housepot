from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from users.services import create_verification_token

User = get_user_model()


class UserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration_returns_jwt_and_email_can_be_verified(self):
        response = self.client.post(
            "/api/users/register/",
            {
                "full_name": "Amina Otieno",
                "email": "AMINA@example.com",
                "phone_number": "+254700000001",
                "password": "Strong-Housepot-Password-92!",
                "role": "landlord",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["role"], "landlord")
        user = User.objects.get(email="amina@example.com")
        self.assertFalse(user.is_email_verified)
        verify_response = self.client.post(
            "/api/users/verify-email/",
            {"token": create_verification_token(user)},
            format="json",
        )
        self.assertEqual(verify_response.status_code, 200)
        user.refresh_from_db()
        self.assertTrue(user.is_email_verified)

    def test_login_accepts_email_and_logout_invalidates_access_token(self):
        user = User.objects.create_user(
            email="tenant@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Tariq Tenant",
        )
        login = self.client.post(
            "/api/users/login/",
            {"email": user.email, "password": "Strong-Housepot-Password-92!"},
            format="json",
        )
        self.assertEqual(login.status_code, 200)
        access = login.data["access"]
        refresh = login.data["refresh"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        self.assertEqual(self.client.get("/api/users/profile/").status_code, 200)
        logout = self.client.post(
            "/api/users/logout/",
            {"refresh": refresh},
            format="json",
        )
        self.assertEqual(logout.status_code, 204)
        self.assertEqual(self.client.get("/api/users/profile/").status_code, 401)

        refresh_response = self.client.post(
            "/api/users/token/refresh/",
            {"refresh": refresh},
            format="json",
        )
        self.assertEqual(refresh_response.status_code, 400)

    def test_password_reset_is_generic_and_token_is_one_time(self):
        user = User.objects.create_user(
            email="reset@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Rita Reset",
        )
        request = self.client.post(
            "/api/users/password-reset/",
            {"email": user.email},
            format="json",
        )
        self.assertEqual(request.status_code, 200)
        self.assertIn("If an active account", request.data["detail"])

        from django.contrib.auth.tokens import default_token_generator
        from django.utils.encoding import force_bytes
        from django.utils.http import urlsafe_base64_encode

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset = self.client.post(
            "/api/users/password-reset/confirm/",
            {
                "uid": uid,
                "token": token,
                "new_password": "Another-Housepot-Password-93!",
            },
            format="json",
        )
        self.assertEqual(reset.status_code, 200, reset.data)
        user.refresh_from_db()
        self.assertTrue(user.check_password("Another-Housepot-Password-93!"))
        repeated = self.client.post(
            "/api/users/password-reset/confirm/",
            {
                "uid": uid,
                "token": token,
                "new_password": "Third-Housepot-Password-94!",
            },
            format="json",
        )
        self.assertEqual(repeated.status_code, 400)

    def test_suspended_accounts_cannot_authenticate(self):
        User.objects.create_user(
            email="suspended@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Sam Suspended",
            is_suspended=True,
        )
        response = self.client.post(
            "/api/users/login/",
            {"email": "suspended@example.com", "password": "Strong-Housepot-Password-92!"},
            format="json",
        )
        self.assertEqual(response.status_code, 400)

    def test_staff_user_admin_form_supports_email_based_accounts(self):
        admin = User.objects.create_superuser(
            email="admin@example.com",
            password="Strong-Housepot-Password-92!",
            full_name="Admin Account",
        )
        self.client.force_login(admin)
        response = self.client.get("/admin/users/user/add/")
        self.assertEqual(response.status_code, 200)
