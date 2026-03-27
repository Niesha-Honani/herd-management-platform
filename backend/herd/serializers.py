from rest_framework import serializers
from .models import Herd, Animal

class HerdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herd
        fields=["id", "rancher",
        "ranch", "name", "description", "reported_headcount", "notes", "created_at", "updated_at"]

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Animal
        fields=["id", "herd",
        "hcp_tag", "owner_tag",
        "tag_color", "description",
        "sex", "animal_class",
        "status", "birth_year",
        "brand", "notes",
        "created_at",
        "updated_at"
        ]