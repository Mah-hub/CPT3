from rest_framework import serializers
from .models import loginAttemtps

class loginAttemptsSerializer(serializers.ModelSerializer):
    class Meta:
        model= loginAttemtps
        fields="__all__"