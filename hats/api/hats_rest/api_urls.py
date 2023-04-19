from .views import api_hats, api_hat
from django.urls import path

urlpatterns = [
    path("hats/", api_hats, name="api_hats"),
    path("hats/<int:id>/", api_hat, name="api_hat")
]
