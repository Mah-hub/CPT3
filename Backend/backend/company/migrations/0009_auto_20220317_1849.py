# Generated by Django 3.2.9 on 2022-03-17 17:49

import company.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '__first__'),
        ('company', '0008_alter_company_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='users',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='company',
            name='image',
            field=models.ImageField(default='users/default.png', upload_to=company.models.upload_to, verbose_name='image'),
        ),
    ]
