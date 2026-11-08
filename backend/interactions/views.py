from django.db import IntegrityError, transaction
from django.utils import timezone
from django.db.models import Q
from rest_framework import decorators, permissions, response, status, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.throttling import ScopedRateThrottle

from audit.services import record_event
from properties.models import Property

from .models import ContentReport, Favorite, Inquiry, Notification, Review
from .email_service import send_or_queue_email
from .serializers import (
    ContentReportSerializer,
    FavoriteSerializer,
    InquiryResponseSerializer,
    InquirySerializer,
    NotificationSerializer,
    ReviewSerializer,
)

def send_notification_email(user, subject, message):
    return send_or_queue_email(user, subject, message)


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "post", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Favorite.objects.none()
        return Favorite.objects.filter(user=self.request.user).select_related(
            "property",
        ).prefetch_related("property__images")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class InquiryViewSet(viewsets.ModelViewSet):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "inquiry"
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Inquiry.objects.none()
        queryset = Inquiry.objects.select_related("property", "sender")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(
            Q(property__owner=self.request.user) | Q(sender=self.request.user)
        )

    def get_serializer_class(self):
        if self.action in {"update", "partial_update"}:
            return InquiryResponseSerializer
        return InquirySerializer

    @transaction.atomic
    def perform_create(self, serializer):
        inquiry = serializer.save()
        owner = inquiry.property.owner
        Notification.objects.create(
            recipient=owner,
            kind="inquiry.received",
            title="New property inquiry",
            message=f"{inquiry.contact_name} asked about {inquiry.property.title}.",
            url="/account",
        )
        transaction.on_commit(
            lambda: send_notification_email(
                owner,
                "New inquiry about your Housepot listing",
                f"{inquiry.contact_name} asked about {inquiry.property.title}:\n\n{inquiry.message}",
            )
        )
        record_event(
            actor=self.request.user,
            action="inquiry.created",
            request=self.request,
            target_type="inquiry",
            target_id=inquiry.pk,
        )

    def perform_update(self, serializer):
        inquiry = self.get_object()
        if not self.request.user.is_staff and inquiry.property.owner_id != self.request.user.pk:
            raise PermissionDenied("Only the property owner can respond to this inquiry.")
        updated = serializer.save(
            responded_at=timezone.now()
            if serializer.validated_data.get("status") == Inquiry.Status.RESPONDED
            else inquiry.responded_at,
        )
        Notification.objects.create(
            recipient=updated.sender,
            kind="inquiry.response",
            title="A property owner responded",
            message=f"You have a response about {updated.property.title}.",
            url="/account",
        )
        record_event(
            actor=self.request.user,
            action="inquiry.responded",
            request=self.request,
            target_type="inquiry",
            target_id=updated.pk,
        )


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Review.objects.none()
        queryset = Review.objects.select_related("property", "author")
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return queryset
        if user.is_authenticated:
            return queryset.filter(Q(status=Review.Status.PUBLISHED) | Q(author=user))
        return queryset.filter(status=Review.Status.PUBLISHED)

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            return [permissions.AllowAny()]
        if self.action in {"approve", "reject"}:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        try:
            with transaction.atomic():
                review = serializer.save()
        except IntegrityError as exc:
            raise PermissionDenied("You have already reviewed this property.") from exc
        record_event(
            actor=self.request.user,
            action="review.created",
            request=self.request,
            target_type="review",
            target_id=review.pk,
        )

    def perform_update(self, serializer):
        review = self.get_object()
        if not self.request.user.is_staff and review.author_id != self.request.user.pk:
            raise PermissionDenied("You can only edit your own review.")
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff and instance.author_id != self.request.user.pk:
            raise PermissionDenied("You can only delete your own review.")
        instance.delete()

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAdminUser])
    @transaction.atomic
    def approve(self, request, pk=None):
        review = self.get_object()
        review.status = Review.Status.PUBLISHED
        review.save(update_fields=["status", "updated_at"])
        Notification.objects.create(
            recipient=review.author,
            kind="review.approved",
            title="Your review has been published",
            message=f"Your review of {review.property.title} is now visible.",
        )
        record_event(
            actor=request.user,
            action="review.approved",
            request=request,
            target_type="review",
            target_id=review.pk,
        )
        return response.Response(self.get_serializer(review).data)

    @decorators.action(detail=True, methods=["post"], permission_classes=[permissions.IsAdminUser])
    @transaction.atomic
    def reject(self, request, pk=None):
        review = self.get_object()
        review.status = Review.Status.REJECTED
        review.save(update_fields=["status", "updated_at"])
        record_event(
            actor=request.user,
            action="review.rejected",
            request=request,
            target_type="review",
            target_id=review.pk,
        )
        return response.Response(self.get_serializer(review).data)


class ContentReportViewSet(viewsets.ModelViewSet):
    serializer_class = ContentReportSerializer
    http_method_names = ["get", "post", "patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ContentReport.objects.none()
        queryset = ContentReport.objects.select_related("reporter", "property", "review")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(reporter=self.request.user)

    def get_permissions(self):
        if self.action == "create":
            return [permissions.IsAuthenticated()]
        if self.action == "list" or self.action == "retrieve":
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        report = serializer.save()
        record_event(
            actor=self.request.user,
            action="content.reported",
            request=self.request,
            target_type="property" if report.property_id else "review",
            target_id=report.property_id or report.review_id,
        )

    def partial_update(self, request, *args, **kwargs):
        report = self.get_object()
        status_value = request.data.get("status")
        if status_value not in ContentReport.Status.values:
            return response.Response(
                {"status": ["Choose a valid report status."]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        report.status = status_value
        report.resolved_at = (
            timezone.now()
            if status_value in {ContentReport.Status.RESOLVED, ContentReport.Status.DISMISSED}
            else None
        )
        report.save(update_fields=["status", "resolved_at"])
        record_event(
            actor=request.user,
            action="content.report_status_changed",
            request=request,
            target_type="report",
            target_id=report.pk,
            metadata={"status": report.status},
        )
        return response.Response(self.get_serializer(report).data)


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Notification.objects.none()
        return Notification.objects.filter(recipient=self.request.user)

    @decorators.action(detail=True, methods=["post"])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save(update_fields=["is_read"])
        return response.Response(self.get_serializer(notification).data)

    @decorators.action(detail=False, methods=["post"])
    def mark_all_read(self, request):
        count = self.get_queryset().filter(is_read=False).update(is_read=True)
        return response.Response({"updated": count})
