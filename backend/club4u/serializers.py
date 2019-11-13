from rest_framework import serializers
from .models import Club, Somoim, UserProfile
from .application_models import ApplicationForm


class UserProfileSerializer(serializers.ModelSerializer):
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


class ApplcationFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationForm
        fields = '__all__'
