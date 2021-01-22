from rest_framework import serializers
from .models import Annotations
from collections import OrderedDict

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotations
        fields='__all__'
    def to_representation(self, instance):
        result = super(ImageSerializer, self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])