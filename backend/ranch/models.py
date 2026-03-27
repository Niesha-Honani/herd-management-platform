from django.db import models

# Create your models here.
class Ranch(models.Model):
    name = models.CharField(
        max_length=150,
        blank=False
    )
    
    location_description=models.CharField(
        max_length=150
    )
    
    city=models.CharField(
        max_length=150
    )
    
    state=models.CharField(
        max_length=10,
        default="AZ"
    )
    
    zip_code=models.CharField(
        max_length=6,
        blank=True)
    
    latitude = models.DecimalField(max_digits=9, decimal_places=6,
    blank=True, null=True)
    
    longitude = models.DecimalField(max_digits=9, decimal_places=6,
    blank=True, null=True)

    notes = models.TextField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.city}"

## Grazing Area w/in Ranch area
class GrazingArea(models.Model):
    ranch = models.ForeignKey(Ranch, on_delete=models.CASCADE, related_name='grazing_areas')
    name = models.CharField(
        max_length=50
    )

    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True,
    null=True)
    
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True,
    null=True)

    notes = models.TextField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.ranch.name})"