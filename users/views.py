from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom view to obtain JWT tokens with additional user information."""
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = request.user
        response.data['is_tenant'] = user.is_tenant
        response.data['is_landlord'] = user.is_landlord
        return response
class UserListView(generics.ListAPIView):
    
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return User.objects.all()
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework.permissions import IsAuthenticated
class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
class UserListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    def has_list_permission(self, request, view):
        # Allow access to staff members for listing users
        return request.user and request.user.is_staff
    def has_create_permission(self, request, view):
        # Allow access to staff members for creating users
        return request.user and request.user.is_staff
class UserDetailPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    def has_update_permission(self, request, view):
        # Allow access to staff members for updating user details
        return request.user and request.user.is_staff
    def has_destroy_permission(self, request, view):
        # Allow access to staff members for deleting user details
        return request.user and request.user.is_staff
class UserProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    def has_update_permission(self, request, view):
        # Allow access to the user themselves for updating their profile
        return request.user and request.user.is_authenticated
    def has_destroy_permission(self, request, view):
        # Allow access to the user themselves for deleting their profile
        return request.user and request.user.is_authenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Invalidate the user's token
        request.auth.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
User = get_user_model()
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()
class UserDetailView(generics.RetrieveUpdateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
User = get_user_model()
class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework import permissions
class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    def has_update_permission(self, request, view):
        # Allow access to staff members for updating user details
        return request.user and request.user.is_staff
    def has_destroy_permission(self, request, view):
        # Allow access to staff members for deleting user details
        return request.user and request.user.is_staff
class UserListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    
    def has_list_permission(self, request, view):
        # Allow access to staff members for listing users
        return request.user and request.user.is_staff
    
    def has_create_permission(self, request, view):
        # Allow access to staff members for creating users
        return request.user and request.user.is_staff
class UserDetailPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    
    def has_update_permission(self, request, view):
        # Allow access to staff members for updating user details
        return request.user and request.user.is_staff
    
    def has_destroy_permission(self, request, view):
        # Allow access to staff members for deleting user details
        return request.user and request.user.is_staff
class UserProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    
    def has_update_permission(self, request, view):
        # Allow access to the user themselves for updating their profile
        return request.user and request.user.is_authenticated
    
    def has_destroy_permission(self, request, view):
        # Allow access to the user themselves for deleting their profile
        return request.user and request.user.is_authenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Invalidate the user's token
        request.auth.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
User = get_user_model()
class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework import permissions
class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    def has_update_permission(self, request, view):
        # Allow access to staff members for updating user details
        return request.user and request.user.is_staff
    def has_destroy_permission(self, request, view):
        # Allow access to staff members for deleting user details
        return request.user and request.user.is_staff
class UserListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    
    def has_list_permission(self, request, view):
        # Allow access to staff members for listing users
        return request.user and request.user.is_staff
    
    def has_create_permission(self, request, view):
        # Allow access to staff members for creating users
        return request.user and request.user.is_staff
class UserDetailPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        # Allow access to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access to the user themselves or staff members
        return obj == request.user or request.user.is_staff
    
    def has_update_permission(self, request, view):
        # Allow access to staff members for updating user details
        return request.user and request.user.is_staff
    
    def has_destroy_permission(self, request, view):
        # Allow access to staff members for deleting user details
        return request.user and request.user.is_staff
