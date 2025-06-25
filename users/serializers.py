from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_tenant', 'is_landlord']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_tenant=validated_data.get('is_tenant', False),
            is_landlord=validated_data.get('is_landlord', False),
        )
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_tenant', 'is_landlord']
        read_only_fields = ['id', 'username', 'email']
    
    def update(self, instance, validated_data):
        instance.is_tenant = validated_data.get('is_tenant', instance.is_tenant)
        instance.is_landlord = validated_data.get('is_landlord', instance.is_landlord)
        instance.save()
        return instance
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_tenant', 'is_landlord']
        read_only_fields = ['id', 'username', 'email']
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.is_tenant = validated_data.get('is_tenant', instance.is_tenant)
        instance.is_landlord = validated_data.get('is_landlord', instance.is_landlord)
        instance.save()
        return instance
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_tenant', 'is_landlord']
        read_only_fields = ['id', 'username', 'email']
    
    def update(self, instance, validated_data):
        instance.is_tenant = validated_data.get('is_tenant', instance.is_tenant)
        instance.is_landlord = validated_data.get('is_landlord', instance.is_landlord)
        instance.save()
        return instance