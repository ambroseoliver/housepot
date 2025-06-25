"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]
# This file defines the URL patterns for the Django project, including the admin interface and user-related endpoints.
# It uses Django's path function to map URLs to views, specifically the admin site and the user application.
# The `include` function is used to reference the URL patterns defined in the `users.urls` module,
# allowing for modular organization of URL configurations.
# This setup enables the project to handle user-related requests, such as registration and authentication,
# while also providing access to the Django admin interface for managing the application.
# The `urlpatterns` list is the main entry point for URL routing in the Django application,
# allowing the framework to direct incoming requests to the appropriate views based on the URL patterns defined.
# This file is essential for setting up the URL routing in a Django project,
# enabling the application to respond to user requests and serve the appropriate content.
# It is typically included in the project's main URL configuration to enable user-related endpoints.
# The `admin.site.urls` path provides access to the Django admin interface,
# while the `users.urls` path includes user-related endpoints for registration and authentication.

# This allows users to interact with the application, manage their accounts, and access protected resources.
