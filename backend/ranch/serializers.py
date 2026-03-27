from rest_framework import serializers
from .models import Ranch

class RanchSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ranch
        fields=["id", "name", "location_description", "city", "state", "zip_code", "latitude", "longitude", "notes", "created_at", "updated_at"]
    