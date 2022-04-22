from django.db.models import query
from django.shortcuts import render
from django.views import generic
from rest_framework import request, serializers
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from authentication.serializers import ForgotPasswordEmail, LoginSerializer, ProfileSerializer, RegisterSerializer, SetNewPasswordSerializer, UsersSerializer,PermissionSerializer,GroupSerializer,ChangePasswordSerializer, UpdateAfterRegister,ProfileAvatarSerializer,LogoutSerializer,ProfileAfterSuccessLoginSerializer
from rest_framework import response , status, permissions
from django.contrib.auth import authenticate
from rest_framework.response import Response

from .models import User
from django.contrib.auth.models import Group,Permission
from rest_framework import generics
from rest_framework import viewsets

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import smart_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMultiAlternatives

from rest_framework.parsers import MultiPartParser, FormParser



# Create your views here.


class PermissionAPIView(APIView):

    def get(self, request):
        serializer = PermissionSerializer(Permission.objects.all(), many=True)

        return response.Response({
            'data': serializer.data
        })


class GroupsAPIView(viewsets.ModelViewSet):

    queryset=Group.objects.all()
    serializer_class=GroupSerializer


class AuthUserAPIView(GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    def get(self,request):
        user=request.user
        serializer = RegisterSerializer(user)
        return response.Response({'user:':serializer.data})



class RegisterAPIView(GenericAPIView):
    authentication_classes= []

    serializer_class = RegisterSerializer

    def post(self,request):
        serializer=self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RegisterUserViaEmail(GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
                
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data=serializer.data["username"]
        user_email=serializer.data["email"]
        user=User.objects.get(username=user_data)

        absurl='http://localhost:4200/account/signup'+";u="+user_data

     

        email_body="<!DOCTYPE html><html><head><meta charset='utf-8'><title>Welcome</title></head><body bgcolor='f8f8ff'><div style='background-color: white; padding: 10px;' > <div class='parent'> <div class='child'> <h1 id='welcome' align='center' style='font-family: helvetica;' > Welcome ! </h1> <div align='center'> <br> <br> <img style='width: 240px;' src='https://i.ibb.co/r09HM8J/welcome.png'> <br> <br><h4 style='font-family: arial;' align='center'> We're excited to have you in ZUM-IT Customer portal. </h4><h4 style='font-family: arial;' align='center'> First you need yo complete your account registration, you just have to click </h4><h4 style='font-family: arial;' align='center'> on the button down below. </h4><br> <br> <form action="+absurl+"><input value='Register account' type='submit' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;' class='button button2'  align='center'> </form> </div> </div></div><div> </body></html>"
        
        data={'email_body':email_body,'domain':absurl, 'to_email': user_email , 'email_subject':'Create your Account'}

        email = EmailMultiAlternatives(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.attach_alternative(email_body, "text/html")
 
        email.send()
 
       
        return Response({
            'success': 'User created',
        })



class RegisterManagerViaEmail(GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
                
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data=serializer.data["username"]
        user_email=serializer.data["email"]
        user=User.objects.get(username=user_data)
        my_group=Group.objects.get(name="manager")
        my_group.user_set.add(user)

        absurl='http://localhost:4200/account/signup'+";u="+user_data

     

        email_body="<!DOCTYPE html><html><head><meta charset='utf-8'><title>Welcome Manager</title></head><body bgcolor='f8f8ff'><div style='background-color: white; padding: 10px;' > <div class='parent'> <div class='child'> <h1 id='welcome' align='center' style='font-family: helvetica;' > Welcome ! </h1> <div align='center'> <br> <br> <img style='width: 240px;' src='https://i.ibb.co/r09HM8J/welcome.png'> <br> <br><h4 style='font-family: arial;' align='center'> We're excited to have you in ZUM-IT Customer portal as a manager. </h4><h4 style='font-family: arial;' align='center'> First you need yo complete your account registration, you just have to click </h4><h4 style='font-family: arial;' align='center'> on the button down below. </h4><br> <br> <form action="+absurl+"><input value='Register account' type='submit' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;' class='button button2'  align='center'> </form> </div> </div></div><div> </body></html>"
        
        data={'email_body':email_body,'domain':absurl, 'to_email': user_email , 'email_subject':'Create your Account'}

        email = EmailMultiAlternatives(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.attach_alternative(email_body, "text/html")
 
        email.send()
 
       
        return Response({
            'id': user.id,
        })











""" def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
                
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_username=serializer.data["username"]
        user_email=serializer.data["email"]
        user=User.objects.get(username=user_username)
        absurl='http://localhost:4200/account/signup'+";u="+user_username
        email_body="<!DOCTYPE html><html><head><meta charset='utf-8'><title>Welcome</title></head><body bgcolor='f8f8ff'><div style='background-color: white; padding: 10px;' > <div class='parent'> <div class='child'> <h1 id='welcome' align='center' style='font-family: helvetica;' > Welcome ! </h1> <div align='center'> <br> <br> <img style='width: 240px;' src='https://i.ibb.co/r09HM8J/welcome.png'> <br> <br><h4 style='font-family: arial;' align='center'> We're excited to have you in ZUM-IT Customer portal. </h4><h4 style='font-family: arial;' align='center'> First you need yo complete your account registration, you just have to click </h4><h4 style='font-family: arial;' align='center'> on the button down below. </h4><br> <br> <form action="+absurl+"><input value='Register account' type='submit' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;' class='button button2'  align='center'> </form> </div> </div></div><div> </body></html>"

        data={'email_body':email_body,'domain':absurl, 'to_email': user_email , 'email_subject':'Create your Account'}

        email = EmailMultiAlternatives(
        subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.attach_alternative(email_body, "text/html")
 
        email.send()
 
        return Response({
            'success': 'user created',
        }) """






class LoginAPIView(GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)






class ProfileAvatar(generics.RetrieveAPIView,generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    parser_classes= [MultiPartParser,FormParser]
    queryset=User.objects.all()
    serializer_class = ProfileAvatarSerializer
    model=User
    def get_object(self):        
        return User.objects.get(username=self.request.user)




class Profile(generics.RetrieveAPIView,generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    queryset=User.objects.all()
    serializer_class = ProfileSerializer
    model=User
    def get_object(self):        
        return User.objects.get(username=self.request.user)


class ProfileAfterSuccessLogin(generics.RetrieveAPIView,generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    queryset=User.objects.all()
    serializer_class = ProfileAfterSuccessLoginSerializer
    model=User
    def get_object(self):        
        return User.objects.get(username=self.request.user)








class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    permission_classes = (permissions.IsAuthenticated,)

    serializer_class = ChangePasswordSerializer
    model = User

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class UsersAPIView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    queryset=User.objects.all()
    serializer_class=UsersSerializer


class RequestPasswordResetEmail(generics.GenericAPIView):
    authentication_classes= []

    serializer_class = ForgotPasswordEmail

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            absurl = 'http://localhost:4200/account/updatepassword'+";token="+str(token)+";u="+uidb64

            email_body = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Hi</title></head><body bgcolor='f8f8ff'><div style='background-color: white; padding: 10px;' > <div class='parent'> <div class='child'> <h1 id='welcome' align='center' style='font-family: helvetica;' > Reset your password ! </h1> <div align='center'> <br> <br> <img style='width: 140px;' src='https://i.ibb.co/br7mnv8/keylock.png'> <br> <br> <br> <br><h4 style='font-family: arial;' align='center'>Click on the button down below to reset your password</h4><form action="+absurl+"><input value='Update password' type='submit' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;' class='button button2' href='http://localhost:4200/updatepassword' align='center'> </form> </div> </div></div><div> </body></html> "

            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}

            email = EmailMultiAlternatives(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
            email.attach_alternative(email_body, "text/html")
            email.send()
            return response.Response({'success': 'We have sent you a link to reset your password','uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        return response.Response({'error': 'User does not exist'},status=status.HTTP_404_NOT_FOUND)



class SetnewPasswordAPIView(generics.GenericAPIView):
    authentication_classes= []
    serializer_class=SetNewPasswordSerializer
    def patch(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return response.Response({'success' :True, 'message':'Password reset success'},status=status.HTTP_200_OK)



class UsernameExist(APIView):

    #permission_classes = (permissions.IsAuthenticated,)
    authentication_classes= []
    serializer_class= RegisterSerializer
    Model=User
    
    def post(self, request):
        
        print("666z",request.data)

        if User.objects.filter(username=request.data["username"]).exists():
            print("666Y")
            return Response("true")

       
        return Response("false")


class UpdateAfterRegister(generics.UpdateAPIView):
    authentication_classes= []
    queryset=User.objects.all()
    serializer_class = UpdateAfterRegister
    model=User
    
    def get_object(self):      
        print("999",self.request.data.get('username'))
        return  User.objects.get(username=self.request.data.get('username').pk)


class LoggedInUserPermissions(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset=User.objects.all()
    serializer_class= RegisterSerializer
    def get(self, request, format=None):
            
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
            'group':(request.user.groups.values_list('name')),
            'permissions':(request.user.get_all_permissions())
        }
        return Response(content)
   
  
class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)