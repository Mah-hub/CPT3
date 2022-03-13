from typing_extensions import Required
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from authentication.models import User
from django.contrib.auth.models import Group, Permission
from django.utils.encoding import smart_str, force_str,smart_bytes,DjangoUnicodeDecodeError
from rest_framework.exceptions import AuthenticationFailed, UnsupportedMediaType
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib import auth





class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission
        fields = ('id','name',)
        extra_kwargs = {
            'name': {'validators': []},
        }

class GroupSerializer(serializers.ModelSerializer):
    permissions=PermissionSerializer(many=True)
    class Meta:
        model = Group
        fields = ('id','name','permissions')
        extra_kwargs = {
            'name': {'validators': []},
        }
        depth=1

    def update(self, instance, validated_data):
        instance.name = validated_data.pop('name', instance.name)
        permissions_data = validated_data.pop('permissions', [])

        for key, val in validated_data.items():
            setattr(instance, key, val)
        instance.save()                     # This will indeed update DB values

        instance.permissions.clear()
        for permission_data in permissions_data:
             my_permission = Permission.objects.get(name=dict(permission_data)["name"])
             instance.permissions.add(my_permission)
      

        return instance



 
class RegisterSerializer(serializers.ModelSerializer):

    password=serializers.CharField(max_length=128,min_length=6, write_only=True)
    class Meta:
        model=User
        fields=['username','email','password']
        depth=1
    
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
    
    


""" class LoginSerializer(serializers.ModelSerializer):

    password=serializers.CharField(max_length=128,min_length=6, write_only=True)
    class Meta:
        model=User
        fields=('username','password','token')

        read_only_fields=['token'] """






class LoginSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField( max_length=255)
    password = serializers.CharField( max_length=68, min_length=6, write_only=True)
   

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = User
        fields = ('username', 'password', 'tokens' )

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')

      

        user = auth.authenticate(username=username, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
       

        return {
            
            'username': user.username,
            'tokens': user.tokens
        }

        return super().validate(attrs)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','first_name','last_name','image','email','phone_number','created_at','updated_at','last_login','groups','user_permissions','is_active','products',]
        depth=1

    def update(self, instance, validated_data):
        instance.username = validated_data.pop('username', instance.username)
        instance.first_name = validated_data.pop('first_name', instance.first_name)
        instance.last_name = validated_data.pop('last_name', instance.last_name)
        instance.email = validated_data.pop('email', instance.email)
        instance.phone_number = validated_data.pop('phone_number', instance.phone_number)

        instance.save()
        return instance


class ProfileAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['image']

    def update(self,instance,validated_data):
        instance.image=validated_data.pop('image',instance.image)
        instance.save()
        return instance



class UsersSerializer(serializers.ModelSerializer):
    user_permissions = PermissionSerializer(many=True)
    groups = GroupSerializer(many=True)

    class Meta:
        model=User
        fields=['id','username','first_name','last_name','email','image','phone_number','created_at','updated_at','last_login','groups','user_permissions','is_active','products',]
        depth=1

    def update(self, instance, validated_data):
        instance.username = validated_data.pop('username', instance.username)
        instance.first_name = validated_data.pop('first_name', instance.first_name)
        instance.last_name = validated_data.pop('last_name', instance.last_name)
        instance.email = validated_data.pop('email', instance.email)
        instance.phone_number = validated_data.pop('phone_number', instance.phone_number)
        groups_data = validated_data.pop('groups', [])
        user_permissions_data = validated_data.pop('user_permissions', [])

        for key, val in validated_data.items():
            setattr(instance, key, val)
        instance.save()                     # This will indeed update DB values

        for group_data in groups_data:
             my_group = Group.objects.get(name=dict(group_data)["name"])
        
        instance.groups.clear()
        instance.groups.add(my_group)     # Add all groups once. Also you can replace these two lines with
                                            # instance.groups.set(group_ids)
        instance.user_permissions.clear()

        for permission_data in user_permissions_data:
             my_permission = Permission.objects.get(name=dict(permission_data)["name"])
             instance.user_permissions.add(my_permission)
      

        return instance


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    



class ForgotPasswordEmail(serializers.Serializer):
    email=serializers.EmailField(min_length=2)
    class Meta:
        fields=['email']




class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid, please try again', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid, please try again', 401)
        return super().validate(attrs)


class UpdateAfterRegister(serializers.Serializer):
     
    
    class Meta:
        model=User
        fields=['username','first_name','last_name','password']
        

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')