from authentication import views
from django.urls import path,include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', views.UsersAPIView)
router.register(r'groups', views.GroupsAPIView)


urlpatterns = [
    
    path('', include(router.urls)),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register',views.RegisterAPIView.as_view(), name="register"),
    path('registeruserviaemail',views.RegisterUserViaEmail.as_view(), name="register2"),
    path('registermanagerviaemail',views.RegisterManagerViaEmail.as_view(), name="register3"),
    path('login',views.LoginAPIView.as_view(), name="login"),
    path('user',views.AuthUserAPIView.as_view(), name="user"),
    path('profile',views.Profile.as_view(),name="profile"),
    path('profileaftersuccess',views.ProfileAfterSuccessLogin.as_view(),name="profile"),

    path('profileavatar/',views.ProfileAvatar.as_view(),name="profile_avatar"),
    path('permissions',views.PermissionAPIView.as_view()),
    path('request-reset-email/',views.RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset-complete/', views.SetnewPasswordAPIView.as_view(), name='SetnewPasswordAPIView'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('usernameexist', views.UsernameExist.as_view(), name='usernameexist'),
    path('updateafterregister/', views.UpdateAfterRegister.as_view(), name='UpdateAfterRegister'),
    path('loggedinuserpermissions', views.LoggedInUserPermissions.as_view(), name='User-Profile-View'),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),



]
