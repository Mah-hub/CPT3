from django.contrib import admin
from .models import User
from .forms import CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class CustomerUserAdmin(UserAdmin):
    model=User
    add_form=CustomUserCreationForm

    fieldsets = (
       *UserAdmin.fieldsets,
       (
           'Alter data',
           {
               'fields':(
                   'phone_number',
                   'products',
                   'image'

               )
           },
           
       )
    )
    
admin.site.register(User,CustomerUserAdmin)