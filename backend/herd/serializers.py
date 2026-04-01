from rest_framework import serializers
from .models import Herd, Animal, TreatmentEvent, TreatmentItem
from ranch.models import Ranch
from datetime import date

class RanchSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranch
        fields=["id", "name",
        "location_description"
        ]

class HerdSerializer(serializers.ModelSerializer):
    ranch_detail = RanchSummarySerializer(source="ranch", read_only=True)

    class Meta:
        model = Herd
        fields=["id", "rancher",
        "ranch", "ranch_detail", "name", "description", "reported_headcount", "notes", "created_at", "updated_at"]
        read_only_fields = ["rancher", "created_at", "updated_at"]

class HerdSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model=Herd
        fields=[
            "id","name",
            "reported_headcount"
        ]

class AnimalSerializer(serializers.ModelSerializer):
    herd_detail = HerdSummarySerializer(source="herd", read_only=True)

    class Meta:
        model=Animal
        fields=["id", "herd",
        "herd_detail",
        "hcp_tag", "owner_tag",
        "tag_color", "description",
        "sex", "animal_class",
        "status", "birth_year",
        "brand", "notes",
        "created_at",
        "updated_at"
        ]
        read_only_fields = [
            "created_at","updated_at"
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
        read_only_fields=["created_at", "updated_at"]
    
    def validate_treated_on(self, value):
        if value > date.today():
            raise serializers.ValidationError("Treatment date cannot be after today.")
        return value

class TreatmentEventSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentEvent
        fields = ["id", "treated_on",
        "animal"
        ]


class TreatmentItemSerializer(serializers.ModelSerializer):
    treatment_event_detail = TreatmentEventSummarySerializer(source="treatment_event", read_only = True)

    class Meta:
        model=TreatmentItem
        fields=["id", "treatment_event",
        "treatment_event_detail",
        "product_name", "serial_number",
        "lot_number", "expires_on",
        "dosage", "method",
        "injection_site", "notes",
        "created_at", "updated_at"
        ]
        read_only_fields = [
            "created_at", "updated_at"
        ]

    def validate_expires_on(self, value):
        if value < date.today():
            raise serializers.ValidationError("This medication is expired.")
        return value

    def validate(self, attrs):
        method = attrs.get("method")
        injection_site = attrs.get("injection_site")

        if method == "oral" and injection_site:
            raise serializers.ValidationError({"injection_site": "Injection site should be blank for oral treatments."})

        return attrs