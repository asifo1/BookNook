from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True)
    mobile = models.CharField(max_length=13, blank=True, null=True)
    city = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.user.username
