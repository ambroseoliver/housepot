from django.contrib import admin

from .models import ContentReport, EmailOutbox, Favorite, Inquiry, Notification, Review


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ["property", "sender", "status", "contact_email", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["property__title", "sender__email", "contact_email", "message"]
    readonly_fields = ["created_at", "updated_at"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["property", "author", "rating", "status", "created_at"]
    list_filter = ["status", "rating", "created_at"]
    search_fields = ["property__title", "author__email", "body"]
    actions = ["approve_reviews"]

    @admin.action(description="Approve selected reviews")
    def approve_reviews(self, request, queryset):
        queryset.update(status=Review.Status.PUBLISHED)


@admin.register(ContentReport)
class ContentReportAdmin(admin.ModelAdmin):
    list_display = ["reporter", "property", "review", "reason", "status", "created_at"]
    list_filter = ["status", "reason", "created_at"]
    search_fields = ["reporter__email", "details"]
    readonly_fields = ["created_at", "resolved_at"]


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ["user", "property", "created_at"]
    search_fields = ["user__email", "property__title"]
    readonly_fields = ["created_at"]


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ["recipient", "kind", "title", "is_read", "created_at"]
    list_filter = ["kind", "is_read", "created_at"]
    search_fields = ["recipient__email", "title", "message"]
    readonly_fields = ["created_at"]


@admin.register(EmailOutbox)
class EmailOutboxAdmin(admin.ModelAdmin):
    list_display = ["recipient", "subject", "status", "attempts", "available_at", "sent_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["recipient", "subject"]
    readonly_fields = [
        "recipient",
        "subject",
        "body",
        "status",
        "attempts",
        "available_at",
        "locked_at",
        "sent_at",
        "last_error",
        "created_at",
    ]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
