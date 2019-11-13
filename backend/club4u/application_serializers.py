from rest_framework import serializers
from .application_models import *


class ShortTextSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShortTextForm
        fields = '__all__'


class LongTextSerializer(serializers.ModelSerializer):

    class Meta:
        model = LongTextForm
        fields = '__all__'


class MultiChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MultiChoiceForm
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageForm
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileForm
        fields = '__all__'


class ApplcationSerializer(serializers.ModelSerializer):
    short_texts = ShortTextSerializer(many=True, read_only=True)
    long_texts = LongTextSerializer(many=True, read_only=True)
    multi_choices = MultiChoiceSerializer(many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    files = FileSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
