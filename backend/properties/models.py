import uuid
from pathlib import PurePath
from datetime import timedelta

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone

from .validators import validate_property_image


def property_image_path(instance, filename):
    extension = PurePath(filename).suffix.lower()
    return f"properties/{instance.property_id}/{uuid.uuid4().hex}{extension}"


class Amenity(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=90, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "amenities"

    def __str__(self):
        return self.name


class Property(models.Model):
    class PropertyType(models.TextChoices):
        BEDSITTER = "bedsitter", "Bedsitter"
        STUDIO = "studio", "Studio"
        APARTMENT = "apartment", "Apartment"
        TOWNHOUSE = "townhouse", "Townhouse"
        HOUSE = "house", "House"
        VILLA = "villa", "Villa"
        OTHER = "other", "Other"

    class ListingType(models.TextChoices):
        RENT = "rent", "For rent"
        SALE = "sale", "For sale"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PENDING = "pending_review", "Pending review"
        PUBLISHED = "published", "Published"
        REJECTED = "rejected", "Rejected"
        ARCHIVED = "archived", "Archived"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="properties",
    )
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=3000)
    location = models.CharField(max_length=150, db_index=True)
    city = models.CharField(max_length=100, blank=True, db_index=True)
    property_type = models.CharField(max_length=20, choices=PropertyType.choices, db_index=True)
    listing_type = models.CharField(max_length=8, choices=ListingType.choices, default=ListingType.RENT)
    price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(1)])
    currency = models.CharField(max_length=3, default="KES")
    bedrooms = models.PositiveSmallIntegerField(validators=[MaxValueValidator(50)])
    bathrooms = models.PositiveSmallIntegerField(validators=[MaxValueValidator(50)])
    amenities = models.ManyToManyField(Amenity, blank=True, related_name="properties")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True)
    available_from = models.DateField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    featured_until = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.CharField(max_length=500, blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviewed_properties",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "listing_type", "-created_at"], name="property_browse_idx"),
            models.Index(fields=["status", "property_type", "price"], name="property_type_price_idx"),
            models.Index(fields=["status", "location", "price"], name="property_location_price_idx"),
        ]
        constraints = [
            models.CheckConstraint(condition=models.Q(price__gt=0), name="property_price_positive"),
            models.CheckConstraint(condition=models.Q(bedrooms__lte=50), name="property_beds_max_50"),
            models.CheckConstraint(condition=models.Q(bathrooms__lte=50), name="property_baths_max_50"),
        ]

    @property
    def monthly_rent(self):
        return self.price if self.listing_type == self.ListingType.RENT else None

    @property
    def primary_image(self):
        return self.images.filter(is_primary=True).first() or self.images.first()

    def __str__(self):
        return self.title

    def publish(self, reviewer):
        now = timezone.now()
        self.status = self.Status.PUBLISHED
        self.reviewed_by = reviewer
        self.reviewed_at = now
        self.rejection_reason = ""
        if self.expires_at is None or self.expires_at <= now:
            self.expires_at = now + timedelta(days=90)


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=property_image_path, validators=[validate_property_image])
    alt_text = models.CharField(max_length=150, blank=True)
    position = models.PositiveSmallIntegerField(default=0)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["position", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["property"],
                condition=models.Q(is_primary=True),
                name="one_primary_image_per_property",
            ),
            models.UniqueConstraint(fields=["property", "position"], name="unique_property_image_position"),
        ]

    def clean(self):
        super().clean()
        if self.property_id and not self.pk and self.property.images.count() >= 10:
            from django.core.exceptions import ValidationError

            raise ValidationError({"image": "A listing can have no more than 10 images."})

    def __str__(self):
        return f"Image {self.position + 1} for {self.property}"
