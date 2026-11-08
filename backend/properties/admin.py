from django.contrib import admin, messages
from django.utils import timezone

from audit.services import record_event

from .models import Amenity, Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 0
    readonly_fields = ["created_at"]


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ["title", "owner", "location", "listing_type", "price", "status", "is_featured", "created_at"]
    list_filter = ["status", "listing_type", "property_type", "is_featured", "created_at"]
    search_fields = ["title", "location", "city", "owner__email"]
    readonly_fields = ["created_at", "updated_at", "reviewed_at"]
    filter_horizontal = ["amenities"]
    inlines = [PropertyImageInline]
    actions = ["approve_listings", "reject_listings"]

    @admin.action(description="Approve selected property listings")
    def approve_listings(self, request, queryset):
        count = 0
        for property_obj in queryset.select_related("owner"):
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
            record_event(
                actor=request.user,
                action="property.approved",
                request=request,
                target_type="property",
                target_id=property_obj.pk,
            )
            count += 1
        self.message_user(request, f"Approved {count} listing(s).", messages.SUCCESS)

    @admin.action(description="Reject selected property listings")
    def reject_listings(self, request, queryset):
        updated = 0
        for property_obj in queryset.select_related("owner"):
            property_obj.status = Property.Status.REJECTED
            property_obj.rejection_reason = "Rejected by moderation staff. Contact Housepot support for details."
            property_obj.reviewed_by = request.user
            property_obj.reviewed_at = timezone.now()
            property_obj.save(
                update_fields=[
                    "status",
                    "rejection_reason",
                    "reviewed_by",
                    "reviewed_at",
                    "updated_at",
                ]
            )
            updated += 1
        self.message_user(
            request,
            f"Rejected {updated} listing(s). Add individual rejection reasons in the property record.",
            messages.WARNING,
        )


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ["name"]}
