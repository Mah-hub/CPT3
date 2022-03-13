from django.db import models

# Create your models here.

class loginAttemtps(models.Model):

    username = models.CharField(max_length=60,blank=True)
    date =models.CharField(max_length=60,blank=True)
    ipaddress=models.CharField(max_length=30,blank=True)
    browsername =models.CharField(max_length=60,blank=True)
    browserversion =models.CharField(max_length=60,blank=True)
    countryname=models.CharField(max_length=60,blank=True)
    countryflag=models.CharField(max_length=60,blank=True)
    countrytld=models.CharField(max_length=60,blank=True)
    capital=models.CharField(max_length=60,blank=True)
    isp=models.CharField(max_length=60,blank=True)
    organisation=models.CharField(max_length=60,blank=True)
    lat=models.CharField(max_length=60,blank=True)
    lng=models.CharField(max_length=60,blank=True)
    currencycode=models.CharField(max_length=60,blank=True)
    currencyname=models.CharField(max_length=60,blank=True)
    currencysymbol=models.CharField(max_length=60,blank=True)




    def __str__(self):
        return self.ipaddress