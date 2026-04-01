from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Herd, Animal, TreatmentEvent, TreatmentItem
from .serializers import HerdSerializer, AnimalSerializer, TreatmentEventSerializer, TreatmentItemSerializer

class HerdListCreateView(generics.ListCreateAPIView):
    queryset = Herd.objects.all()
    serializer_class = HerdSerializer
    permission_classes = [AllowAny]


class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Animal.objects.all()
        herd_id = self.request.query_params.get("herd")
        if herd_id:
            queryset = queryset.filter(herd=herd_id)
        return queryset

class TreatmentEventListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentEvent.objects.all()
    serializer_class = TreatmentEventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = TreatmentEvent.objects.all()
        animal_id = self.request.query_params.get("animal")
        if animal_id:
            queryset = queryset.filter(animal=animal_id)
        return queryset

class TreatmentItemListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentItem.objects.all()
    serializer_class = TreatmentItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = TreatmentItem.objects.all()
        treatment_event_id = self.request.query_params.get("treatment_event")
        if treatment_event_id:
            queryset = queryset.filter(treatment_event=treatment_event_id)
        return queryset