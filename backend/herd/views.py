from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Herd, Animal, TreatmentEvent, TreatmentItem
from .serializers import HerdSerializer, AnimalSerializer, TreatmentEventSerializer, TreatmentItemSerializer

class HerdListView(generics.ListAPIView):
    queryset = Herd.objects.all()
    serializer_class = HerdSerializer
    permission_classes = [AllowAny]

class AnimalListView(generics.ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [AllowAny]

class TreatmentEventListView(generics.ListAPIView):
    queryset = TreatmentEvent.objects.all()
    serializer_class = TreatmentEventSerializer
    permission_classes = [AllowAny]

class TreatmentItemListView(generics.ListAPIView):
    queryset = TreatmentItem.objects.all()
    serializer_class = TreatmentItemSerializer
    permission_classes = [AllowAny] 