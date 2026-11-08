from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class HousepotUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["email", "full_name", "role", "phone_number"]


class HousepotUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = "__all__"


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    add_form = HousepotUserCreationForm
    form = HousepotUserChangeForm
    ordering = ["email"]
    list_display = ["email", "full_name", "role", "is_email_verified", "is_active", "is_suspended"]
    list_filter = ["role", "is_email_verified", "is_active", "is_suspended", "is_staff"]
    search_fields = ["email", "full_name", "phone_number"]
    readonly_fields = ["last_login", "date_joined", "updated_at"]
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("full_name", "phone_number", "profile_image")}),
        ("Permissions", {"fields": ("role", "is_email_verified", "is_suspended", "suspension_reason", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined", "updated_at")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "full_name", "password1", "password2", "role")}),
    )
