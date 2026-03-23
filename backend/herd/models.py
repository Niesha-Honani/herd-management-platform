from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from ranch.models import Ranch

# Create your models here.
class Herd(models.Model):
    rancher = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="herds"
    )

    ranch = models.ForeignKey(
        Ranch, on_delete=models.CASCADE,
        blank=False, null=False, related_name="herds"
    )

    name = models.CharField(
        max_length=150
    )
    description=models.TextField(
        blank=True
    )
    reported_headcount=models.IntegerField(
        validators=[MinValueValidator(0)], blank=True, null=True
    )
    
    notes = models.TextField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
