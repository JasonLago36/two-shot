# Generated by Django 4.0.3 on 2023-04-19 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_alter_shoes_bin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='bin_number',
        ),
    ]