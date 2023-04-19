from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Shoes,BinVO
from common.json import ModelEncoder
# Create your views here.

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "import_href"
    ]


class ShoeEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color"
    ]
    encoders = {
        "bins": BinVOEncoder
    }

@require_http_methods(["GET","POST"])
def api_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeEncoder,
            safe=False,
        )


@require_http_methods(["GET","DELETE","PUT"])
def api_shoes_details(request,id):
    if request.method == "GET":
        shoes = Shoes.objects.get(id=id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "closet_name" in content:
                bin = BinVO.objects.get(id=id)
                content["closet_name"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid state abbreviation"},
                status=400,
            )
        Shoes.objects.filter(id=id).update(**content)
        shoes = Shoes.objects.get(id=id)
        return JsonResponse(
            shoes,
            encoder=ShoeEncoder,
            safe=False,
        )
