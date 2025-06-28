# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Core apps
    path('api/users/', include('users.urls')),
    path('api/core/', include('core.urls')),

    # DRF Browsable API Login
    path('api-auth/', include('rest_framework.urls')),  # login/logout UI

    # Djoser URLs (JWT + Token + Social)
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/auth/', include('djoser.urls.social')),

    # Optional if you're using token auth manually (usually not needed with Djoser+JWT)
    path('api/token-auth/', include('rest_framework.authtoken.urls')),
]
