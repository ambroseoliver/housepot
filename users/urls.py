from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
# This file defines the URL patterns for user-related endpoints, including registration and JWT authentication.
# It uses Django's path function to map URLs to views, specifically the RegisterView for user registration
# and the TokenObtainPairView and TokenRefreshView for JWT authentication.
# The RegisterView handles user registration, while the TokenObtainPairView and TokenRefreshView
# handle JWT token generation and refreshing, respectively.
# This setup allows for user registration and authentication in a RESTful manner,
# leveraging Django REST Framework and Simple JWT for token management.
# This file is part of a Django project that manages user registration and authentication.
# It is typically included in the project's main URL configuration to enable user-related endpoints.
# The RegisterView is responsible for handling user registration requests,
# while the TokenObtainPairView and TokenRefreshView are used for JWT authentication.
# This allows users to register, log in, and obtain JWT tokens for secure access to protected resources.
# The use of Simple JWT provides a robust authentication mechanism,
# allowing for token-based authentication in a stateless manner.
# This file is essential for setting up user authentication and registration in a Django application,
# enabling users to create accounts and securely access the application using JWT tokens.
#
# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },

#     },

# ]

# DATABASES = {

#     'default': {

#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# This file defines the URL patterns for user-related endpoints, including registration and JWT authentication.



# It uses Django's path function to map URLs to views, specifically the RegisterView for user registration

# and the TokenObtainPairView and TokenRefreshView for JWT authentication.
# The RegisterView handles user registration, while the TokenObtainPairView and TokenRefreshView
# handle JWT token generation and refreshing, respectively.

  