from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import companySerializer
from .models import Company

# Create your views here.

class Company(viewsets.ModelViewSet):
    
    queryset=Company.objects.all()
    serializer_class=companySerializer