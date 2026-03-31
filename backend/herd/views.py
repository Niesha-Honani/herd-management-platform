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

class TreatmentEventListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentEvent.objects.all()
    serializer_class = TreatmentEventSerializer
    permission_classes = [AllowAny]

class TreatmentItemListCreateView(generics.ListCreateAPIView):
    queryset = TreatmentItem.objects.all()
    serializer_class = TreatmentItemSerializer
    permission_classes = [AllowAny] 