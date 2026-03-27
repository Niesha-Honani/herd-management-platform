from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Herd, Animal
from .serializers import HerdSerializer, AnimalSerializer

class HerdListView(generics.ListAPIView):
    queryset = Herd.objects.all()
    serializer_class = HerdSerializer
    permission_classes = [AllowAny]

class AnimalListView(generics.ListAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [AllowAny]