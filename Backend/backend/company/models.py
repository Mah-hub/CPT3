from django.db import models
from django.utils.translation import gettext_lazy as _
from PIL import Image

# Create your models here.

def upload_to(instance, filename):

    return 'companies/{filename}'.format(filename=filename)

class Company(models.Model):

    code=models.CharField(max_length=100,primary_key=True)
    name=models.CharField(max_length=255)
    description=models.CharField(max_length=350,blank=True)
    address=models.CharField(max_length=255,blank=True)
    country=models.CharField(max_length=60,blank=True)
    currency=models.CharField(max_length=60,blank=True)
    language=models.CharField(max_length=25,blank=True)

    status = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this company should be treated as active. '
            'Unselect this instead of deleting companies.'
        ),
    )



    image =models.ImageField(_('image'),upload_to=upload_to,default='users/default.png')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path) # Open image using self

        if img.height > 300 or img.width > 300:
            new_img = (300, 300)
            img.thumbnail(new_img)
            img.save(self.image.path)  # saving image at the same path

