from django.shortcuts import render
from rest_framework import serializers, response
from rest_framework.generics import GenericAPIView
from .models import Product
from .serializers import productSerializer
from .permissions import D7896DjangoModelPermissions

# Create your views here.



class ProductListAPIView(GenericAPIView):
    permission_classes =[D7896DjangoModelPermissions]
    queryset=Product.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        serializer = productSerializer(queryset, many=True)
        return response.Response(serializer.data)