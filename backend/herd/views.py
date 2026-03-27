from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Herd
from .serializers import HerdSerializer

class HerdListView(generics.ListAPIView):
    queryset = Herd.objects.all()
    serializer_class = HerdSerializer
    permission_classes = [AllowAny]