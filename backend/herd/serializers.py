from rest_framework import serializers
from .models import Herd

class HerdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herd
        fields=["id", "rancher",
        "ranch", "name", "description", "reported_headcount", "notes", "created_at", "updated_at"]