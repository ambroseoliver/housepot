from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    AccountDeletionView,
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
    ProfileView,
    RegisterView,
    ResendVerificationView,
    VerifyEmailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", ProfileView.as_view(), name="user-profile"),
    path("verify-email/", VerifyEmailView.as_view(), name="user-verify-email"),
    path("verify-email/resend/", ResendVerificationView.as_view(), name="user-verify-email-resend"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="user-password-reset"),
    path(
        "password-reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="user-password-reset-confirm",
    ),
    path("password/change/", PasswordChangeView.as_view(), name="user-password-change"),
    path("account/", AccountDeletionView.as_view(), name="user-account-delete"),
]
