# Generated by Django 2.2 on 2020-04-07 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='price',
            field=models.PositiveIntegerField(),
        ),
    ]
