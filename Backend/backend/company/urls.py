from django.urls import path,include
from rest_framework import routers
from company import views

router = routers.DefaultRouter()
router.register(r'get', views.CompanyGet)
router.register(r'post', views.CompanyPost)

router.register(r'getusers', views.CompanyUsers)


urlpatterns=[
     path('', include(router.urls)),
     path('mycompany',views.myCompany.as_view(),name="myCompany"),

     ]