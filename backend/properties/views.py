from datetime import timedelta

from django.db import transaction
from django.db.models import Count, Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import decorators, permissions, response, status, viewsets
from rest_framework.exceptions import PermissionDenied

from audit.services import record_event
from interactions.models import Notification
from interactions.email_service import send_or_queue_email

from .filters import PropertyFilter
from .models import Amenity, Property, PropertyImage
from .permissions import CanManageProperties
from .serializers import (
    AdminDashboardSerializer,
    AmenitySerializer,
    PropertyImageManageSerializer,
    PropertySerializer,
)


@extend_schema_view(
    list=extend_schema(summary="Search published properties"),
    retrieve=extend_schema(summary="Get a property"),
    create=extend_schema(summary="Submit a property for review"),
)
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    filterset_class = PropertyFilter
    search_fields = ["title", "description", "location", "city"]
    ordering_fields = ["created_at", "price", "bedrooms", "bathrooms"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Property.objects.select_related("owner", "reviewed_by").prefetch_related(
            "amenities",
            "images",
        )
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return queryset
        if user.is_authenticated:
            return queryset.filter(Q(status=Property.Status.PUBLISHED) | Q(owner=user))
        return queryset.filter(status=Property.Status.PUBLISHED)

    def get_permissions(self):
        if self.action in {"create", "update", "partial_update", "destroy"}:
            return [permissions.IsAuthenticated(), CanManageProperties()]
        if self.action in {"approve", "reject"}:
            return [permissions.IsAdminUser()]
        if self.action == "mine":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        property_obj = serializer.save(
            owner=self.request.user,
            status=serializer.validated_data.get("status", Property.Status.PENDING),
        )
        record_event(
            actor=self.request.user,
            action="property.created",
            request=self.request,
            target_type="property",
            target_id=property_obj.pk,
        )

    def perform_update(self, serializer):
        property_obj = self.get_object()
        if not self.request.user.is_staff and property_obj.owner_id != self.request.user.pk:
            raise PermissionDenied("You can only edit your own property listings.")
        updated = serializer.save()
        record_event(
            actor=self.request.user,
            action="property.updated",
            request=self.request,
            target_type="property",
            target_id=updated.pk,
        )

    def perform_destroy(self, instance):
        if not self.request.user.is_staff and instance.owner_id != self.request.user.pk:
            raise PermissionDenied("You can only delete your own property listings.")
        record_event(
            actor=self.request.user,
            action="property.deleted",
            request=self.request,
            target_type="property",
            target_id=instance.pk,
        )
        instance.delete()

    @decorators.action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def mine(self, request):
        queryset = self.filter_queryset(
            Property.objects.filter(owner=request.user)
            .select_related("owner")
            .prefetch_related("amenities", "images")
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            return self.get_paginated_response(self.get_serializer(page, many=True).data)
        return response.Response(self.get_serializer(queryset, many=True).data)

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAdminUser])
    @transaction.atomic
    def approve(self, request, pk=None):
        property_obj = self.get_object()
        property_obj.publish(request.user)
        property_obj.save(
            update_fields=[
                "status",
                "reviewed_by",
                "reviewed_at",
                "rejection_reason",
                "expires_at",
                "updated_at",
            ]
        )
        Notification.objects.create(
            recipient=property_obj.owner,
            kind="property.approved",
            title="Your property is published",
            message=f"{property_obj.title} is now visible to home seekers.",
            url="/listings",
        )
        transaction.on_commit(
            lambda: send_or_queue_email(
                property_obj.owner,
                "Your Housepot property is published",
                f"{property_obj.title} is now visible to home seekers.",
            )
        )
        record_event(
            actor=request.user,
            action="property.approved",
            request=request,
            target_type="property",
            target_id=property_obj.pk,
        )
        return response.Response(self.get_serializer(property_obj).data)

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAdminUser])
    @transaction.atomic
    def reject(self, request, pk=None):
        property_obj = self.get_object()
        reason = request.data.get("reason", "")
        if not isinstance(reason, str) or not reason.strip():
            return response.Response(
                {"reason": ["A rejection reason is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        property_obj.status = Property.Status.REJECTED
        property_obj.rejection_reason = reason.strip()[:500]
        property_obj.reviewed_by = request.user
        property_obj.reviewed_at = timezone.now()
        property_obj.save(
            update_fields=["status", "rejection_reason", "reviewed_by", "reviewed_at", "updated_at"]
        )
        Notification.objects.create(
            recipient=property_obj.owner,
            kind="property.rejected",
            title="Your property needs changes",
            message=property_obj.rejection_reason,
            url="/list-property",
        )
        transaction.on_commit(
            lambda: send_or_queue_email(
                property_obj.owner,
                "Update to your Housepot property",
                f"{property_obj.title} was not approved.\n\nReason: {property_obj.rejection_reason}",
            )
        )
        record_event(
            actor=request.user,
            action="property.rejected",
            request=request,
            target_type="property",
            target_id=property_obj.pk,
            metadata={"reason": property_obj.rejection_reason},
        )
        return response.Response(self.get_serializer(property_obj).data)

    @decorators.action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAdminUser],
    )
    def feature(self, request, pk=None):
        property_obj = self.get_object()
        if property_obj.status != Property.Status.PUBLISHED:
            return response.Response(
                {"detail": "Only published properties can be featured."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        featured = request.data.get("is_featured", True)
        if not isinstance(featured, bool):
            return response.Response(
                {"is_featured": ["Expected a boolean."]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        property_obj.is_featured = featured
        property_obj.featured_until = timezone.now() + timedelta(days=30) if featured else None
        property_obj.save(update_fields=["is_featured", "featured_until", "updated_at"])
        return response.Response({"is_featured": property_obj.is_featured})


class AmenityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = [permissions.AllowAny]


class PropertyImageViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyImageManageSerializer
    http_method_names = ["get", "patch", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return PropertyImage.objects.none()
        queryset = PropertyImage.objects.select_related("property", "property__owner")
        user = self.request.user
        return queryset.filter(property__owner=user) if not user.is_staff else queryset

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def perform_update(self, serializer):
        with transaction.atomic():
            image = PropertyImage.objects.select_for_update().get(pk=self.get_object().pk)
            new_position = serializer.validated_data.get("position", image.position)
            conflicting = PropertyImage.objects.filter(
                property=image.property,
                position=new_position,
            ).exclude(pk=image.pk).first()
            if conflicting:
                conflicting.position = image.position
                conflicting.save(update_fields=["position"])
            if serializer.validated_data.get("is_primary"):
                PropertyImage.objects.filter(property=image.property, is_primary=True).exclude(
                    pk=image.pk
                ).update(is_primary=False)
            was_primary = image.is_primary
            updated = serializer.save()
            if was_primary and serializer.validated_data.get("is_primary") is False:
                replacement = image.property.images.exclude(pk=image.pk).order_by("position", "id").first()
                if replacement:
                    replacement.is_primary = True
                    replacement.save(update_fields=["is_primary"])

    def perform_destroy(self, instance):
        with transaction.atomic():
            property_obj = instance.property
            was_primary = instance.is_primary
            instance.delete()
            if was_primary:
                replacement = property_obj.images.order_by("position", "id").first()
                if replacement:
                    replacement.is_primary = True
                    replacement.save(update_fields=["is_primary"])


class AdminDashboardView(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AdminDashboardSerializer

    def list(self, request):
        from interactions.models import ContentReport, Inquiry, Review
        from users.models import User

        properties = Property.objects.aggregate(
            total=Count("id"),
            pending=Count("id", filter=Q(status=Property.Status.PENDING)),
            published=Count("id", filter=Q(status=Property.Status.PUBLISHED)),
        )
        return response.Response(
            {
                "users": User.objects.count(),
                "properties": properties,
                "open_inquiries": Inquiry.objects.filter(status=Inquiry.Status.NEW).count(),
                "pending_reviews": Review.objects.filter(status=Review.Status.PENDING).count(),
                "open_reports": ContentReport.objects.filter(
                    status__in=[ContentReport.Status.OPEN, ContentReport.Status.REVIEWING]
                ).count(),
            }
        )
