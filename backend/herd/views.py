from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Herd, Animal, TreatmentEvent, TreatmentItem
from .serializers import HerdSerializer, AnimalSerializer, TreatmentEventSerializer, TreatmentItemSerializer

class HerdListCreateView(generics.ListCreateAPIView):
    queryset = Herd.objects.all()
    serializer_class = HerdSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(rancher=self.request.user)

    def get_queryset(self):
        return Herd.objects.filter(rancher=self.request.user)


class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Animal.objects.filter(herd__rancher=self.request.user)
        herd_id = self.request.query_params.get("herd")
        if herd_id:
            queryset = queryset.filter(herd=herd_id)
        return queryset

class AnimalDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Animal.objects.filter(herd__rancher=self.request.user)


class TreatmentEventListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentEvent.objects.all()
    serializer_class = TreatmentEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TreatmentEvent.objects.filter(animal__herd__rancher=self.request.user)
        animal_id = self.request.query_params.get("animal")
        if animal_id:
            queryset = queryset.filter(animal=animal_id)
        return queryset

class TreatmentEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TreatmentEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TreatmentEvent.objects.filter(animal__herd__rancher=self.request.user)

class TreatmentItemListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentItem.objects.all()
    serializer_class = TreatmentItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TreatmentItem.objects.filter(treatment_event__animal__herd__rancher=self.request.user)
        treatment_event_id = self.request.query_params.get("treatment_event")
        if treatment_event_id:
            queryset = queryset.filter(treatment_event=treatment_event_id)
        return queryset

class TreatmentItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TreatmentItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TreatmentItem.objects.filter(treatment_event__animal__herd__rancher=self.request.user) 