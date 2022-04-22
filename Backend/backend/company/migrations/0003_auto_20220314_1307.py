# Generated by Django 3.2.9 on 2022-03-14 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '__first__'),
        ('company', '0002_company_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='users',
        ),
        migrations.AddField(
            model_name='company',
            name='users',
            field=models.ManyToManyField(blank=True, to='authentication.User'),
        ),
    ]