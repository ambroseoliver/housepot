from django.db import transaction
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from .models import Amenity, Property, PropertyImage
from .validators import optimize_property_image, validate_property_image


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id", "name", "slug"]


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ["id", "image", "alt_text", "position", "is_primary"]

    @extend_schema_field(OpenApiTypes.URI)
    def get_image(self, obj) -> str:
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class PropertyImageManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "property", "image", "alt_text", "position", "is_primary"]
        read_only_fields = ["id", "property", "image"]

    def validate_position(self, value):
        if value > 9:
            raise serializers.ValidationError("Image positions must be between 0 and 9.")
        return value


class AdminDashboardSerializer(serializers.Serializer):
    users = serializers.IntegerField()
    properties = serializers.DictField(child=serializers.IntegerField())
    open_inquiries = serializers.IntegerField()
    pending_reviews = serializers.IntegerField()
    open_reports = serializers.IntegerField()


class PropertySerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    owner_name = serializers.CharField(source="owner.full_name", read_only=True)
    monthly_rent = serializers.SerializerMethodField()
    status = serializers.ChoiceField(
        choices=[
            (Property.Status.DRAFT, Property.Status.DRAFT.label),
            (Property.Status.PENDING, Property.Status.PENDING.label),
        ],
        required=False,
    )
    price = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=1, required=False)
    cover_image = serializers.SerializerMethodField()
    image = serializers.ImageField(
        write_only=True,
        required=False,
        allow_null=True,
        validators=[validate_property_image],
    )
    image_files = serializers.ListField(
        child=serializers.ImageField(validators=[validate_property_image]),
        write_only=True,
        required=False,
        max_length=10,
    )
    images = PropertyImageSerializer(many=True, read_only=True)
    amenities = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Amenity.objects.all(),
        required=False,
    )

    class Meta:
        model = Property
        fields = [
            "id",
            "owner",
            "owner_name",
            "title",
            "description",
            "location",
            "city",
            "property_type",
            "listing_type",
            "price",
            "monthly_rent",
            "currency",
            "bedrooms",
            "bathrooms",
            "amenities",
            "image",
            "image_files",
            "images",
            "cover_image",
            "status",
            "rejection_reason",
            "available_from",
            "expires_at",
            "is_featured",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "owner",
            "rejection_reason",
            "expires_at",
            "is_featured",
            "created_at",
            "updated_at",
        ]

    def to_internal_value(self, data):
        if "monthly_rent" in data and "price" not in data:
            data = data.copy()
            data["price"] = data["monthly_rent"]
        return super().to_internal_value(data)

    def validate(self, attrs):
        if attrs.get("price") is None and self.instance is None:
            raise serializers.ValidationError({"price": "This field is required."})
        image = attrs.get("image")
        image_files = attrs.get("image_files", [])
        if image and image_files:
            raise serializers.ValidationError("Use either image or image_files, not both.")
        if self.instance is None and not image and not image_files:
            raise serializers.ValidationError({"image": "Upload at least one property image."})
        if self.instance and self.instance.images.count() + len(image_files) + bool(image) > 10:
            raise serializers.ValidationError({"image_files": "A listing can have no more than 10 images."})
        return attrs

    @extend_schema_field(OpenApiTypes.DECIMAL)
    def get_monthly_rent(self, obj):
        return obj.price if obj.listing_type == Property.ListingType.RENT else None

    @extend_schema_field(OpenApiTypes.URI)
    def get_cover_image(self, obj):
        primary = obj.primary_image
        if not primary:
            return None
        request = self.context.get("request")
        url = primary.image.url
        return request.build_absolute_uri(url) if request else url

    @transaction.atomic
    def create(self, validated_data):
        image = validated_data.pop("image", None)
        image_files = validated_data.pop("image_files", [])
        amenities = validated_data.pop("amenities", [])
        property_obj = Property.objects.create(**validated_data)
        property_obj.amenities.set(amenities)
        uploaded_images = ([image] if image else []) + image_files
        for position, uploaded_image in enumerate(uploaded_images):
            PropertyImage.objects.create(
                property=property_obj,
                image=optimize_property_image(uploaded_image),
                position=position,
                is_primary=position == 0,
            )
        return property_obj

    @transaction.atomic
    def update(self, instance, validated_data):
        image = validated_data.pop("image", None)
        image_files = validated_data.pop("image_files", [])
        amenities = validated_data.pop("amenities", None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        requested_status = validated_data.pop("status", None)
        if instance.status == Property.Status.PUBLISHED:
            instance.status = Property.Status.PENDING
        elif requested_status is not None:
            instance.status = requested_status
        instance.reviewed_by = None
        instance.reviewed_at = None
        instance.save()
        if amenities is not None:
            instance.amenities.set(amenities)
        uploaded_images = ([image] if image else []) + image_files
        if uploaded_images:
            last_position = instance.images.order_by("-position").values_list(
                "position",
                flat=True,
            ).first()
            next_position = 0 if last_position is None else last_position + 1
            for offset, uploaded_image in enumerate(uploaded_images):
                PropertyImage.objects.create(
                    property=instance,
                    image=optimize_property_image(uploaded_image),
                    position=next_position + offset,
                    is_primary=not instance.images.filter(is_primary=True).exists() and offset == 0,
                )
        return instance
