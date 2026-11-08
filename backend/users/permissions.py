from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAccountAvailable(BasePermission):
    message = "This account is inactive or restricted."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_active
            and not request.user.is_suspended
        )


class IsVerifiedAccount(IsAccountAvailable):
    message = "Verify your email address before performing this action."

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_email_verified


class IsPropertyOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or obj.owner_id == request.user.id)
        )
