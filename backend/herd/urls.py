from django.urls import path
from .views import HerdListCreateView, AnimalListView, TreatmentEventListView, TreatmentItemListView

urlpatterns=[
    path('herds/',
    HerdListCreateView.as_view(),
    name='herd-list-create'),

    path('animals/',
    AnimalListView.as_view(),
    name='animal-list'),

   path('treatment-events/', TreatmentEventListView.as_view(),
   name='treatment-list'),

   path('treatment-items/', TreatmentItemListView.as_view(),
   name='treatment-item-list'), 
]