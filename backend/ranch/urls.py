from django.urls import path
from .views import RanchListView

urlpatterns=[
    path('ranches/', RanchListView.as_view(), name='ranch-list'),
]