from django.contrib.auth import authenticate, password_validation
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from properties.validators import optimize_property_image


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["token_version"] = user.token_version
        token["role"] = user.role
        return token

    def validate(self, attrs):
        attrs["email"] = attrs.pop(self.username_field)
        user = authenticate(
            request=self.context.get("request"),
            email=attrs["email"],
            password=attrs["password"],
        )
        if user is None:
            raise serializers.ValidationError(
                {"detail": "No active account found with the supplied credentials."}
            )
        if user.is_suspended:
            raise serializers.ValidationError(
                {"detail": "This account is restricted. Contact Housepot support."}
            )
        data = super().validate({self.username_field: attrs["email"], "password": attrs["password"]})
        data["user"] = UserSerializer(user, context=self.context).data
        data["role"] = user.role
        return data


class VersionedTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        try:
            refresh = RefreshToken(attrs["refresh"])
            user = User.objects.get(pk=refresh["user_id"], is_active=True)
        except (KeyError, TokenError, User.DoesNotExist) as exc:
            raise serializers.ValidationError(
                {"refresh": "The refresh token is invalid or expired."}
            ) from exc
        if user.is_suspended or refresh.get("token_version") != user.token_version:
            raise serializers.ValidationError(
                {"refresh": "The refresh token is no longer valid."}
            )
        return super().validate(attrs)


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
        validators=[validate_password],
    )
    role = serializers.ChoiceField(choices=[("tenant", "Tenant"), ("landlord", "Landlord")])

    class Meta:
        model = User
        fields = ["id", "full_name", "email", "phone_number", "password", "role"]
        read_only_fields = ["id"]

    def validate_email(self, value):
        return value.strip().lower()

    @transaction.atomic
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "phone_number",
            "role",
            "profile_image",
            "is_email_verified",
            "date_joined",
        ]
        read_only_fields = ["id", "email", "role", "is_email_verified", "date_joined"]

    def validate_phone_number(self, value):
        return value.strip()

    def update(self, instance, validated_data):
        image = validated_data.get("profile_image")
        if image:
            validated_data["profile_image"] = optimize_property_image(image)
        return super().update(instance, validated_data)


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True, trim_whitespace=False)
    new_password = serializers.CharField(write_only=True, trim_whitespace=False)

    def validate_new_password(self, value):
        password_validation.validate_password(value, self.context["request"].user)
        return value

    def validate_current_password(self, value):
        if not self.context["request"].user.check_password(value):
            raise serializers.ValidationError("The current password is incorrect.")
        return value


class TokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserSerializer()
    role = serializers.CharField()


class LogoutRequestSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class EmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)


class VerificationRequestSerializer(serializers.Serializer):
    token = serializers.CharField()


class DetailResponseSerializer(serializers.Serializer):
    detail = serializers.CharField()
