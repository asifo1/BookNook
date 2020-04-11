from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True)
    mobile = models.CharField(max_length=13, blank=True, null=True)
    city = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(upload_to='profile_img',
                              blank=True, default="profile_img/default.png")

    def __str__(self):
        return self.user.username


class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True)
    author = models.CharField(max_length=30, blank=True, null=True)
    price = models.PositiveIntegerField()
    timestamp = models.DateField(auto_now_add=True, auto_now=False)
    time = models.DateTimeField(auto_now=True)
    is_sold = models.BooleanField(default=False)
    image = models.ImageField(upload_to='books_img',
                              blank=True, default="books_img/default.png")

    def __str__(self):
        return self.name
