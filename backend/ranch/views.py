from rest_framework import generics
from rest_framework.permissions import AllowAny 

from .models import Ranch
from .serializers import RanchSerializer

# Create your views here.

class RanchListCreateView(generics.ListCreateAPIView):
    queryset = Ranch.objects.all()
    serializer_class = RanchSerializer
    permission_classes = [AllowAny]

