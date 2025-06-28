from django.urls import path
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    UserProfileView,
    UserLogoutView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("me/", UserProfileView.as_view(), name="user-profile"),
    path("users/", UserListView.as_view(), name="user-list"),  # admin
    path("users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),  # admin or self
]
