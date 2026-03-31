from django.urls import path
from .views import HerdListCreateView, AnimalListCreateView, TreatmentEventListCreateView, TreatmentItemListCreateView

urlpatterns=[
    path('herds/',
    HerdListCreateView.as_view(),
    name='herd-list-create'),

    path('animals/',
    AnimalListCreateView.as_view(),
    name='animal-list-create'),

   path('treatment-events/', TreatmentEventListCreateView.as_view(),
   name='treatment-event-list-create'),

   path('treatment-items/', TreatmentItemListCreateView.as_view(),
   name='treatment-item-list-create'), 
]