from django.db import models

# Create your models here.

class Product(models.Model):
    desc=models.CharField(max_length=200)
    image=models.CharField(max_length=200)