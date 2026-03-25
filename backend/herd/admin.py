from django.contrib import admin
from .models import Herd, Animal, TreatmentEvent, TreatmentItem

# Register your models here.
admin.site.register([Herd, Animal, TreatmentEvent, TreatmentItem])