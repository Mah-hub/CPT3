from django.shortcuts import render
from rest_framework import viewsets
from .models import loginAttemtps
from .serializer import loginAttemptsSerializer


class loginAttemptsView(viewsets.ModelViewSet):
    authentication_classes= []
    queryset=loginAttemtps.objects.all()
    serializer_class=loginAttemptsSerializer