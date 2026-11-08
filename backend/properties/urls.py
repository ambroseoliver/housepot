from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import AdminDashboardView, AmenityViewSet, PropertyImageViewSet, PropertyViewSet

router = DefaultRouter()
router.register("listings", PropertyViewSet, basename="property")
router.register("amenities", AmenityViewSet, basename="amenity")
router.register("property-images", PropertyImageViewSet, basename="property-image")

urlpatterns = router.urls + [
    path("admin/dashboard/", AdminDashboardView.as_view({"get": "list"}), name="admin-dashboard"),
]
