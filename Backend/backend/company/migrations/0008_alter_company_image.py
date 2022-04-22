# Generated by Django 3.2.9 on 2022-03-17 09:52

import company.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0007_alter_company_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='image',
            field=models.ImageField(default='companies/default.png', upload_to=company.models.upload_to, verbose_name='image'),
        ),
    ]