# Generated by Django 2.2 on 2020-04-08 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_auto_20200407_1732'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, default='books_img/default.png', upload_to='books_img'),
        ),
    ]
