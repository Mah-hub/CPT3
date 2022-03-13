from django.urls import path,include
from rest_framework import routers
from loginattempts import views

router= routers.DefaultRouter()
router.register('',views.loginAttemptsView)

urlpatterns=[
    path('',include(router.urls)),
]