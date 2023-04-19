from django.db import models
from django.urls import reverse
# Create your models here.


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)


class Hats(models.Model):
    name = models.CharField(null=True, max_length=50)
    fabric = models.CharField(null=True, max_length=50)
    color = models.CharField(null=True, max_length=50)
    picture = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
        default=None,
    )

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"id": self.id})
