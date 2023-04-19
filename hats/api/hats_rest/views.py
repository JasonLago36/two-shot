from django.shortcuts import render
from .models import Hats, LocationVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name"
        ]


class HatsEncoder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "name",
        "fabric",
        "color",
        "picture"
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_hats(request):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsEncoder,
        )
    else:
        content = json.loads(request.body)
        location = LocationVO.objects.get(id=content["location_id"])
        hats = Hats.objects.create(location=location, **content)
        return JsonResponse(
            hats,
            encoder=HatsEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_hat(request, id):
    if request.method == "GET":
        hats = Hats.objects.get(id=id)
        return JsonResponse(
            hats,
            encoder=HatsEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hats.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "location" in content:
                location = LocationVO.objects.get(id=id)
                content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Location"},
                status=400,
            )
        Hats.objects.filter(id=id).update(**content)
        hats = Hats.objects.get(id=id)
        return JsonResponse(
            hats,
            encoder=HatsEncoder,
            safe=False,
        )
