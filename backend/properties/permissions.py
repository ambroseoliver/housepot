from rest_framework.permissions import BasePermission, SAFE_METHODS


class CanManageProperties(BasePermission):
    message = "Only landlords, real estate agents, and administrators can manage property listings."

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.is_active
            and not user.is_suspended
            and (user.is_staff or user.role in {"landlord", "agent"})
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user.is_staff or obj.owner_id == request.user.id)
