# Generated by Django 3.2.9 on 2022-03-17 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0009_auto_20220317_1849'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='users',
            new_name='manager',
        ),
    ]