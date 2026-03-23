from django.contrib import admin
from .models import Ranch, GrazingArea

# Register your models here.
admin.site.register([Ranch, GrazingArea])