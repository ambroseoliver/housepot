from rest_framework.routers import DefaultRouter

from .views import (
    ContentReportViewSet,
    FavoriteViewSet,
    InquiryViewSet,
    NotificationViewSet,
    ReviewViewSet,
)

router = DefaultRouter()
router.register("favorites", FavoriteViewSet, basename="favorite")
router.register("inquiries", InquiryViewSet, basename="inquiry")
router.register("reviews", ReviewViewSet, basename="review")
router.register("reports", ContentReportViewSet, basename="report")
router.register("notifications", NotificationViewSet, basename="notification")

urlpatterns = router.urls
