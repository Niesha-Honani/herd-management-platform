from django.urls import path
from .views import RanchListCreateView

urlpatterns=[
    path('ranches/', RanchListCreateView.as_view(), name='ranch-list-create'),
]