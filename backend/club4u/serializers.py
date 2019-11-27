from rest_framework import serializers
from .models import *
from .application_models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'last_name')


class DeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    dept = DeptSerializer(read_only=True)
    major = MajorSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class ClubSerializer(serializers.ModelSerializer):
    managers = UserProfileSerializer(many=True, read_only=True)
    likers = UserProfileSerializer(many=True, read_only=True)
    appliers = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Club
        fields = '__all__'


class SomoimSerializer(serializers.ModelSerializer):
    managers = UserProfileSerializer(many=True, read_only=True)
    likers = UserProfileSerializer(many=True, read_only=True)
    joiners = UserProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Somoim
        fields = '__all__'
