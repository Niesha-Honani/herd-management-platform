from django.contrib.auth.models import AbstractUser
from django.db import models

# custom User Model
class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=True,
        null=False,
    )
    is_rancher=models.BooleanField()

    USERNAME_FIELD="username"
    REQUIRED_FIELDS = ["is_rancher"]


