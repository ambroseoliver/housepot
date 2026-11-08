from rest_framework import serializers
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field

from .models import ContentReport, Favorite, Inquiry, Notification, Review
from properties.models import Property
from users.models import phone_validator


class FavoriteSerializer(serializers.ModelSerializer):
    property_id = serializers.PrimaryKeyRelatedField(
        source="property",
        queryset=Property.objects.filter(status=Property.Status.PUBLISHED),
        write_only=True,
    )
    property_title = serializers.CharField(source="property.title", read_only=True)
    property_location = serializers.CharField(source="property.location", read_only=True)
    cover_image = serializers.SerializerMethodField()
    price = serializers.DecimalField(source="property.price", max_digits=12, decimal_places=2, read_only=True)
    monthly_rent = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = [
            "id",
            "property_id",
            "property_title",
            "property_location",
            "cover_image",
            "price",
            "monthly_rent",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    @extend_schema_field(OpenApiTypes.URI)
    def get_cover_image(self, obj):
        primary = obj.property.primary_image
        if not primary:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(primary.image.url) if request else primary.image.url

    @extend_schema_field(OpenApiTypes.DECIMAL)
    def get_monthly_rent(self, obj):
        return obj.property.monthly_rent

    def create(self, validated_data):
        favorite, _created = Favorite.objects.get_or_create(
            user=self.context["request"].user,
            property=validated_data["property"],
        )
        return favorite


class InquirySerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source="property.title", read_only=True)
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.ChoiceField(choices=Inquiry.Status.choices, read_only=True)
    contact_name = serializers.CharField(required=False, max_length=120)
    contact_email = serializers.EmailField(required=False)
    contact_phone = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=30,
        validators=[phone_validator],
    )

    class Meta:
        model = Inquiry
        fields = [
            "id",
            "property",
            "property_title",
            "sender",
            "contact_name",
            "contact_email",
            "contact_phone",
            "message",
            "status",
            "owner_response",
            "responded_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "sender",
            "status",
            "owner_response",
            "responded_at",
            "created_at",
            "updated_at",
        ]

    def validate_property(self, property_obj):
        if property_obj.status != Property.Status.PUBLISHED:
            raise serializers.ValidationError("You can only inquire about published properties.")
        return property_obj

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Please include at least 10 characters.")
        return value

    def validate_contact_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Enter a contact name.")
        return value

    def validate_contact_phone(self, value):
        return value.strip()

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data.setdefault("contact_name", user.full_name)
        validated_data.setdefault("contact_email", user.email)
        validated_data.setdefault("contact_phone", user.phone_number)
        return Inquiry.objects.create(sender=user, **validated_data)


class InquiryResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["status", "owner_response"]

    def validate(self, attrs):
        if attrs.get("status") == Inquiry.Status.RESPONDED and not attrs.get(
            "owner_response",
            self.instance.owner_response,
        ).strip():
            raise serializers.ValidationError(
                {"owner_response": "Add a response before marking the inquiry as responded."}
            )
        return attrs


class ReviewSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.full_name", read_only=True)
    property_title = serializers.CharField(source="property.title", read_only=True)
    status = serializers.ChoiceField(choices=Review.Status.choices, read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "property",
            "property_title",
            "author",
            "author_name",
            "rating",
            "body",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "author", "status", "created_at", "updated_at"]

    def validate_property(self, property_obj):
        if property_obj.status != Property.Status.PUBLISHED:
            raise serializers.ValidationError("You can only review published properties.")
        if property_obj.owner_id == self.context["request"].user.pk:
            raise serializers.ValidationError("You cannot review your own property.")
        return property_obj

    def validate_body(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Please include at least 10 characters.")
        return value

    def validate(self, attrs):
        property_obj = attrs.get("property", self.instance.property if self.instance else None)
        author = self.context["request"].user
        existing = Review.objects.filter(property=property_obj, author=author)
        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)
        if property_obj and existing.exists():
            raise serializers.ValidationError(
                {"property": "You have already reviewed this property."}
            )
        return attrs

    def create(self, validated_data):
        return Review.objects.create(author=self.context["request"].user, **validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.status = Review.Status.PENDING
        instance.save()
        return instance


class ContentReportSerializer(serializers.ModelSerializer):
    reporter = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.ChoiceField(choices=ContentReport.Status.choices, read_only=True)

    class Meta:
        model = ContentReport
        fields = [
            "id",
            "property",
            "review",
            "reporter",
            "reason",
            "details",
            "status",
            "created_at",
            "resolved_at",
        ]
        read_only_fields = ["id", "reporter", "status", "created_at", "resolved_at"]

    def validate(self, attrs):
        property_obj = attrs.get("property")
        review = attrs.get("review")
        if bool(property_obj) == bool(review):
            raise serializers.ValidationError("Report exactly one property or one review.")
        if property_obj and property_obj.status != Property.Status.PUBLISHED:
            raise serializers.ValidationError({"property": "Only published properties can be reported."})
        if review and review.status != Review.Status.PUBLISHED:
            raise serializers.ValidationError({"review": "Only published reviews can be reported."})
        reporter = self.context["request"].user
        existing = ContentReport.objects.filter(reporter=reporter)
        if property_obj and existing.filter(property=property_obj).exists():
            raise serializers.ValidationError(
                {"property": "You have already reported this property."}
            )
        if review and existing.filter(review=review).exists():
            raise serializers.ValidationError(
                {"review": "You have already reported this review."}
            )
        return attrs

    def create(self, validated_data):
        return ContentReport.objects.create(
            reporter=self.context["request"].user,
            **validated_data,
        )


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "kind", "title", "message", "url", "is_read", "created_at"]
        read_only_fields = ["id", "kind", "title", "message", "url", "created_at"]
