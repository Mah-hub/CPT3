# Generated by Django 3.2.9 on 2021-12-20 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='loginAttemtps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=60)),
                ('date', models.CharField(blank=True, max_length=60)),
                ('ipaddress', models.CharField(blank=True, max_length=30)),
                ('browsername', models.CharField(blank=True, max_length=60)),
                ('browserversion', models.CharField(blank=True, max_length=60)),
                ('countryname', models.CharField(blank=True, max_length=60)),
                ('countryflag', models.CharField(blank=True, max_length=60)),
                ('countrytld', models.CharField(blank=True, max_length=60)),
                ('capital', models.CharField(blank=True, max_length=60)),
                ('isp', models.CharField(blank=True, max_length=60)),
                ('organisation', models.CharField(blank=True, max_length=60)),
                ('lat', models.CharField(blank=True, max_length=60)),
                ('lng', models.CharField(blank=True, max_length=60)),
            ],
        ),
    ]
