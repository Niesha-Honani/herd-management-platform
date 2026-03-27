from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from ranch.models import Ranch
from datetime import date

def current_year():
    return date.today().year

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

    def __str__(self):
        return f"{self.name} - {self.rancher}"

class Animal(models.Model):
    class CowSex(models.TextChoices):
        female = "female"
        male = "male"
        unknown = "unknown"

    class AnimalClass(models.TextChoices):
        cow = "cow"
        bull = "bull"
        heifer = "heifer"
        steer = "steer"
        calf = "calf"
        unknown = "unknown"

    class CowStatus(models.TextChoices):
        active = "active"
        sold = "sold"
        deceased="deceased"
        transferred="transferred"
        missing="missing"

    herd =models.ForeignKey(Herd, on_delete=models.CASCADE, related_name="animals")
    hcp_tag=models.CharField(max_length=20, blank=True)
    owner_tag=models.CharField(max_length=20, blank=True)
    tag_color=models.CharField(max_length=20, blank=True)
    description=models.TextField(max_length=150, blank=True)
    sex=models.CharField(choices=CowSex.choices, max_length=15)
    animal_class=models.CharField(choices=AnimalClass.choices, max_length=15)
    status=models.CharField(choices=CowStatus.choices, max_length=15)
    birth_year=models.PositiveIntegerField(validators=[MinValueValidator(1900), MaxValueValidator(current_year())], default=1900)
    brand=models.CharField(blank=True, max_length=150)
    notes=models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.hcp_tag:
            return self.hcp_tag
        elif self.owner_tag:
                return self.owner_tag
        return f"Animal {self.id}" 

class TreatmentEvent(models.Model):
    animal=models.ForeignKey(Animal, on_delete=models.CASCADE,related_name="treatment_events")
    treated_on=models.DateField(blank=False)
    notes=models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.animal} - {self.treated_on}"

class TreatmentItem(models.Model):
    class TreatmentMethod(models.TextChoices):
        SUBCUTANEOUS="subcutaneous"
        INTRAMUSCULAR="intramuscular"
        INTRANASAL="intranasal"
        ORAL="oral"
        OTHER="other"

    treatment_event=models.ForeignKey(
        TreatmentEvent,
        on_delete=models.CASCADE,
        related_name="treatment_items"
    )
    product_name=models.CharField(max_length=150)
    serial_number=models.CharField(max_length=150, blank=True)
    lot_number=models.CharField(max_length=150, blank=True)
    expires_on=models.DateField(blank=False)
    dosage=models.CharField(max_length=20, blank=True)
    method=models.CharField(choices=TreatmentMethod.choices, max_length=45)
    injection_site=models.CharField(max_length=25, blank=True)
    notes=models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product_name} - {self.treatment_event.treated_on}"