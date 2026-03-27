from django.urls import path
from .views import HerdListView, AnimalListView

urlpatterns=[
    path('herds/',
    HerdListView.as_view(),
    name='herd-list'),

    path('animals/',
    AnimalListView.as_view(),
    name='animal-list'),
]