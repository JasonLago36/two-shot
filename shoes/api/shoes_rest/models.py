from django.db import models
from django.urls import reverse
# Create your models here.


class BinVO (models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField()
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
        null=True
    )

# Create your models here.
