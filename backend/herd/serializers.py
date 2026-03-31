from rest_framework import serializers
from .models import Herd, Animal, TreatmentEvent, TreatmentItem

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

class AnimalSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = [
            "id", "hcp_tag",
            "owner_tag", "animal_class",
            "status"
        ]

class TreatmentEventSerializer(serializers.ModelSerializer):
    animal_detail = AnimalSummarySerializer(source="animal", read_only=True)

    class Meta:
        model = TreatmentEvent
        fields = ["id", "animal",
        "animal_detail",
        "treated_on", "notes",
        "created_at", "updated_at",
        ]
    

class TreatmentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=TreatmentItem
        fields=["id", "treatment_event",
        "product_name", "serial_number",
        "lot_number", "expires_on",
        "dosage", "method",
        "injection_site", "notes",
        "created_at", "updated_at"
        ]