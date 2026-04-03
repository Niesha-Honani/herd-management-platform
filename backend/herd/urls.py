from django.urls import path
from .views import HerdListCreateView, AnimalListCreateView, AnimalDetailView,TreatmentEventListCreateView, TreatmentEventDetailView, TreatmentItemListCreateView, TreatmentItemDetailView

urlpatterns=[
    path('herds/',
    HerdListCreateView.as_view(),
    name='herd-list-create'),

    path('animals/',
    AnimalListCreateView.as_view(),
    name='animal-list-create'),

    path('animals/<int:pk>/', AnimalDetailView.as_view(), name='animal-detail'),

    path('treatment-events/', TreatmentEventListCreateView.as_view(),
    name='treatment-event-list-create'),

    path('treatment-events/<int:pk>/', TreatmentEventDetailView.as_view(), name= 'treatment-event-detail'),

    path('treatment-items/', TreatmentItemListCreateView.as_view(),
    name='treatment-item-list-create'),

    path('treatment-items/<int:pk>/', TreatmentItemDetailView.as_view(), name='treatment-item-detail')
]