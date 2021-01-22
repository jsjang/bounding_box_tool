from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .serializers import ImageSerializer
from rest_framework import status
from .models import Annotations
from django.db import transaction
import json
class ImageView(APIView):
    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get_assign(request):
        image_queryset = None
        with transaction.atomic():
            image_queryset = Annotations.objects.values('id', 'image_url', 'image_id', 'seq_num').filter(flag=0).order_by('id')[:1]
        print (image_queryset)
        if image_queryset:
            image_queryset_serializer = ImageSerializer(image_queryset, many=True)
            return Response(image_queryset_serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    
    @api_view(('PUT',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def put_result(request, **kwargs):
        if kwargs.get('image_id') is None:
            return Response("invalid request1", status=status.HTTP_400_BAD_REQUEST)
        else:
            image_id = kwargs.get('image_id')
            print(request.body)
            json_params = json.loads(request.body)
            print (request.body)
            get_image_object = Annotations.objects.get(image_id=image_id)
            
            box = json_params.get('box')
            get_image_object.lefttop_x     = box.get('left')     # bounding box와 체크박스를 통해 받은 정보를 여기서 업데이트
            get_image_object.lefttop_y     = box.get('top')    
            get_image_object.rightbottom_x = get_image_object.lefttop_x + box.get('width')
            get_image_object.rightbottom_y = get_image_object.lefttop_y + box.get('height')

            tag = json_params.get('tag')
            get_image_object.box_id        = json_params.get('box_id')
            get_image_object.truncated     = tag.get('truncated')
            get_image_object.hidden        = tag.get('hidden')
            get_image_object.light_reflex  = tag.get('light_reflex')
            get_image_object.na            = tag.get('na')
            get_image_object.flag          = 1
            get_image_object.save()           

            return Response(status=status.HTTP_200_OK)