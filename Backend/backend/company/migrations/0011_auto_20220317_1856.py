# Generated by Django 3.2.9 on 2022-03-17 17:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '__first__'),
        ('company', '0010_rename_users_company_manager'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='users',
            field=models.ManyToManyField(related_name='users', to='authentication.User'),
        ),
        migrations.AlterField(
            model_name='company',
            name='manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='manager', to='authentication.user'),
        ),
    ]
