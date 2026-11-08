from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

from .managers import UserManager
from properties.validators import validate_property_image


phone_validator = RegexValidator(
    regex=r"^\+?[0-9\s().-]{7,30}$",
    message="Enter a valid phone number.",
)


class User(AbstractUser):
    class Role(models.TextChoices):
        TENANT = "tenant", "Tenant"
        LANDLORD = "landlord", "Landlord"
        AGENT = "agent", "Real estate agent"
        ADMIN = "admin", "Administrator"

    username = None
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=120)
    phone_number = models.CharField(
        max_length=30,
        blank=True,
        validators=[phone_validator],
    )
    role = models.CharField(max_length=12, choices=Role.choices, default=Role.TENANT)
    is_email_verified = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False, db_index=True)
    suspension_reason = models.CharField(max_length=500, blank=True)
    token_version = models.PositiveIntegerField(default=0)
    profile_image = models.ImageField(
        upload_to="profiles/%Y/%m/",
        blank=True,
        validators=[validate_property_image],
    )
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    objects = UserManager()

    class Meta:
        ordering = ["-date_joined"]
        indexes = [
            models.Index(fields=["role", "is_active"], name="user_role_active_idx"),
            models.Index(fields=["is_email_verified", "is_active"], name="user_verified_active_idx"),
        ]

    def __str__(self):
        return self.email
