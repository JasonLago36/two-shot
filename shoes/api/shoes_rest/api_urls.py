from django.urls import path
from .views import api_shoes,api_shoes_details

urlpatterns = [
    path("shoes/", api_shoes, name="api_shoes"),
    path("shoes/<int:id>/", api_shoes_details, name="api_shoes_details")
]
