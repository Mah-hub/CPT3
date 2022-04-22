from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import companySerializerGet, companySerializerGetusers, companySerializerPost
from .models import Company
from rest_framework.response import Response

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from authentication.models import User
# Create your views here.

class CompanyGet(viewsets.ModelViewSet):
    
    queryset=Company.objects.all()
    serializer_class=companySerializerGet

  
class CompanyPost(viewsets.ModelViewSet):

    queryset=Company.objects.all()
    serializer_class=companySerializerPost


class CompanyUsers(viewsets.ModelViewSet):
    
    queryset=Company.objects.all()
    serializer_class=companySerializerGetusers


class myCompany(generics.RetrieveAPIView,generics.UpdateAPIView):
    queryset=Company.objects.all()
    serializer_class = companySerializerGet
    model=Company
    def get_object(self):   
        l = self.request.user.groups.values_list('name',flat = True) # QuerySet Object
        l_as_list = list(l)
        if l_as_list[0] == "manager":  
            return Company.objects.get(manager=self.request.user)

        response = {
            
                'status': 'forbidden',
                'code': status.HTTP_403_FORBIDDEN,
                'message': 'Forbidden',
                'data': []
            }
        return Response(response)
 
