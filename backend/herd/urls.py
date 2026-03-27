from django.urls import path
from .views import HerdListView, AnimalListView, TreatmentEventListView, TreatmentItemListView

urlpatterns=[
    path('herds/',
    HerdListView.as_view(),
    name='herd-list'),

    path('animals/',
    AnimalListView.as_view(),
    name='animal-list'),

   path('treatment-events/', TreatmentEventListView.as_view(),
   name='treatment-list'),

   path('treatment-items/', TreatmentItemListView.as_view(),
   name='treatment-item-list'), 
]