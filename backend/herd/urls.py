from django.urls import path
from .views import HerdListView

urlpatterns=[
    path('herds/',
    HerdListView.as_view(),
    name='herd-list'),
]