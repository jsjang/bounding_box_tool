from django.urls import path
from . import views
 
app_name = 'image_api'
urlpatterns = [
    path('get_task', views.ImageView.get_assign),
    path('put_task/<int:image_id>', views.ImageView.put_result)
]
