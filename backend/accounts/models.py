from django.contrib.auth.models import AbstractUser
from django.db import models

# custom User Model
class User(AbstractUser):
    is_rancher=models.BooleanField(default=False)

    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.username}"

