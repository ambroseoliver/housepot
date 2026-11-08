import logging
from smtplib import SMTPException

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core import signing
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.mail import send_mail
from django.db import transaction
from django.db.models import F
from django.urls import reverse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from drf_spectacular.utils import extend_schema

from audit.services import record_event
from interactions.models import Favorite, Inquiry, Notification, Review
from properties.models import Property, PropertyImage

from .models import User
from .serializers import (
    EmailTokenObtainPairSerializer,
    DetailResponseSerializer,
    EmailRequestSerializer,
    LogoutRequestSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    RegistrationSerializer,
    TokenResponseSerializer,
    UserSerializer,
    VerificationRequestSerializer,
)
from .services import send_verification_email, verification_payload

logger = logging.getLogger(__name__)
UserModel = get_user_model()


def token_response(user, http_status=status.HTTP_200_OK):
    refresh = RefreshToken.for_user(user)
    refresh["token_version"] = user.token_version
    refresh["role"] = user.role
    return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data,
            "role": user.role,
        },
        status=http_status,
    )


class RegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @transaction.atomic
    def perform_create(self, serializer):
        user = serializer.save()
        Notification.objects.create(
            recipient=user,
            kind="account.welcome",
            title="Welcome to Housepot",
            message="Your account is ready. Verify your email to secure it.",
        )
        try:
            send_verification_email(user)
        except (OSError, SMTPException):
            logger.exception("Could not send verification email to user_id=%s", user.pk)
        self.user = user
        record_event(
            actor=user,
            action="user.register",
            request=self.request,
            target_type="user",
            target_id=user.pk,
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return token_response(self.user, status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @extend_schema(request=EmailTokenObtainPairSerializer, responses=TokenResponseSerializer)
    def post(self, request):
        serializer = EmailTokenObtainPairSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        record_event(
            actor=serializer.user,
            action="user.login",
            request=request,
            target_type="user",
            target_id=serializer.user.pk,
        )
        return Response(serializer.validated_data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(request=LogoutRequestSerializer, responses={204: None})
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            raise ValidationError({"refresh": "A refresh token is required."})
        try:
            token = RefreshToken(refresh_token)
            if str(token["user_id"]) != str(request.user.pk):
                raise ValidationError({"refresh": "The token does not belong to this account."})
            token.blacklist()
        except (KeyError, DjangoValidationError, TokenError, ValueError) as exc:
            raise ValidationError({"refresh": "The refresh token is invalid."}) from exc
        record_event(
            actor=request.user,
            action="user.logout",
            request=request,
            target_type="user",
            target_id=request.user.pk,
        )
        user = request.user
        user.token_version += 1
        user.save(update_fields=["token_version", "updated_at"])
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        user = serializer.save()
        record_event(
            actor=user,
            action="user.profile_updated",
            request=self.request,
            target_type="user",
            target_id=user.pk,
        )


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @extend_schema(
        request=VerificationRequestSerializer,
        responses=DetailResponseSerializer,
    )
    def post(self, request):
        token = request.data.get("token")
        if not isinstance(token, str) or not token:
            raise ValidationError({"token": "A verification token is required."})
        try:
            payload = verification_payload(token)
            user = UserModel.objects.get(pk=payload["user_id"], email=payload["email"])
        except (signing.BadSignature, KeyError, TypeError, UserModel.DoesNotExist) as exc:
            raise ValidationError({"token": "This verification link is invalid or expired."}) from exc
        if user.is_email_verified:
            return Response({"detail": "Email address is already verified."})
        user.is_email_verified = True
        user.save(update_fields=["is_email_verified", "updated_at"])
        record_event(
            actor=user,
            action="user.email_verified",
            request=request,
            target_type="user",
            target_id=user.pk,
        )
        return Response({"detail": "Email address verified."})


class ResendVerificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @extend_schema(request=None, responses=DetailResponseSerializer)
    def post(self, request):
        user = request.user
        if user.is_email_verified:
            return Response({"detail": "Email address is already verified."})
        try:
            send_verification_email(user)
        except (OSError, SMTPException) as exc:
            logger.exception("Could not resend verification email to user_id=%s", user.pk)
            return Response(
                {"detail": "The verification email could not be sent. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response({"detail": "Verification email sent."})


class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @extend_schema(request=EmailRequestSerializer, responses=DetailResponseSerializer)
    def post(self, request):
        email = request.data.get("email", "")
        if isinstance(email, str):
            user = UserModel.objects.filter(email__iexact=email.strip(), is_active=True).first()
            if user:
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                reset_path = reverse("user-password-reset-confirm")
                reset_url = f"{settings.FRONTEND_URL}/account/reset-password?uid={uid}&token={token}"
                try:
                    send_mail(
                        "Reset your Housepot password",
                        (
                            f"Use the following one-time credentials with {reset_path}:\n"
                            f"uid: {uid}\ntoken: {token}\n\nReset page: {reset_url}"
                        ),
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                except (OSError, SMTPException):
                    logger.exception("Could not send password reset email to user_id=%s", user.pk)
                    return Response(
                        {
                            "detail": (
                                "If an active account matches that email, reset instructions "
                                "have been sent."
                            )
                        }
                    )
        return Response(
            {"detail": "If an active account matches that email, reset instructions have been sent."}
        )


class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    @extend_schema(
        request=PasswordResetConfirmSerializer,
        responses=DetailResponseSerializer,
    )
    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        password = request.data.get("new_password")
        if not all(isinstance(value, str) and value for value in (uid, token, password)):
            raise ValidationError({"detail": "uid, token, and new_password are required."})
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = UserModel.objects.get(pk=user_id, is_active=True)
        except (ValueError, TypeError, UserModel.DoesNotExist) as exc:
            raise ValidationError({"uid": "The reset link is invalid or expired."}) from exc
        if not default_token_generator.check_token(user, token):
            raise ValidationError({"token": "The reset link is invalid or expired."})
        try:
            from django.contrib.auth.password_validation import validate_password

            validate_password(password, user)
        except DjangoValidationError as exc:
            raise ValidationError({"new_password": list(exc.messages)}) from exc
        user.set_password(password)
        user.token_version += 1
        user.save(update_fields=["password", "token_version", "updated_at"])
        record_event(
            actor=user,
            action="user.password_reset",
            request=request,
            target_type="user",
            target_id=user.pk,
        )
        return Response({"detail": "Password has been reset. Sign in with your new password."})


class PasswordChangeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        request=PasswordChangeSerializer,
        responses=DetailResponseSerializer,
    )
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data["new_password"])
        request.user.token_version += 1
        request.user.save(update_fields=["password", "token_version", "updated_at"])
        record_event(
            actor=request.user,
            action="user.password_changed",
            request=request,
            target_type="user",
            target_id=request.user.pk,
        )
        return Response({"detail": "Password has been changed. Sign in again on other devices."})


class AccountDeletionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    @extend_schema(request=None, responses={204: None})
    def delete(self, request):
        user = UserModel.objects.select_for_update().get(pk=request.user.pk)
        record_event(
            actor=user,
            action="user.account_deactivated",
            request=request,
            target_type="user",
            target_id=user.pk,
        )
        user.is_active = False
        user.token_version = F("token_version") + 1
        old_profile_image = user.profile_image
        user.email = f"deleted-{user.pk}@deleted.housepot.invalid"
        user.full_name = "Deleted account"
        user.phone_number = ""
        user.profile_image = ""
        Property.objects.filter(owner=user).update(
            status=Property.Status.ARCHIVED,
            is_featured=False,
        )
        PropertyImage.objects.filter(property__owner=user).delete()
        Favorite.objects.filter(user=user).delete()
        Review.objects.filter(author=user).delete()
        Notification.objects.filter(recipient=user).delete()
        Inquiry.objects.filter(sender=user).update(
            contact_name="Deleted account",
            contact_email=f"deleted-{user.pk}@deleted.housepot.invalid",
            contact_phone="",
            message="[removed by account owner]",
        )
        user.save(
            update_fields=[
                "is_active",
                "token_version",
                "email",
                "full_name",
                "phone_number",
                "profile_image",
                "updated_at",
            ]
        )
        if old_profile_image:
            transaction.on_commit(lambda: old_profile_image.delete(save=False))
        return Response(status=status.HTTP_204_NO_CONTENT)
