from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()

# 🔐 Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# 🔐 Login View with additional data
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        try:
            user = User.objects.get(username=request.data.get("username"))
            response.data['is_tenant'] = user.is_tenant
            response.data['is_landlord'] = user.is_landlord
        except User.DoesNotExist:
            pass
        return response


# 👤 User Profile View (view/update own info)
class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# 🔒 Logout View
class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


# 🔎 Admin Only: List All Users
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAdminUser]


# 🔍 Admin or Self: View or Update Any User
class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user if self.request.user.is_authenticated else None
# Admin users can access any user, while regular users can only access their own profile.