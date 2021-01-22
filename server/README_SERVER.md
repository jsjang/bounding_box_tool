Back End 및 API 개발 가이드입니다. 첫번째 API(/gettask)는 user가 브라우저를 통해 접속하면 작업 되지 않은 이미지의 image_id와 image_url을 전달하는 API이며, 두번째 API(/gettask/{image_id}/)는 user가 이미지를 제출하면 해당 이미지의 bbox좌표와 체크박스 체크 사항 정보를 field에 저장하는 API입니다.

- 웹 프레임워크: Django

- 개발 언어: Python 

- 개발 환경: Windows

- 데이터베이스: MySQL

 
### 1. 준비 

- Django 설치 및 하위 앱 생성
- pip 설치(Python 3.4 버전 이상이면 이미 설치되어 있습니다.)
### 2. 아래 코드를 command prompt나 terminal에 입력하여 실행합니다.

```
python get-pip.py
```

### 3. django 다운로드

아래 코드를 command prompt나 terminal에 입력하여 실행합니다.

```
pip install django
```

### 4. django 프로젝트 생성 후 프로젝트 내 앱 생성하기

아래 코드를 command prompt나 terminal에 입력하여 실행합니다.

```
django-admin.py startproject 프로젝트 이름
```
이제 프로젝트가 생성된 경로에서 python manage.py runserver를 입력하고 실행하여 서버가 정상적으로 작동하는지 확인할 수 있습니다. 아래 코드를 입력하여 앱을 생성합니다.

```
python manage.py startapp 앱 이름
```
그 후, 프로젝트 내 settings.py 내에 있는 INSTALLED_APPS에 해당 앱을 추가합니다.

 

### 5. MySQL 쿼리문
```
schema_sample_data.sql 파일 참고
```

### 6. Django와 MySQL 연동하기

1) 파이썬에서 MySQL을 사용할 수 있게 하는 데이터베이스 커넥터 설치


pip install mysqlclient
2) 생성한 앱 내에 my_settings.py라는 빈 파일을 생성하고, 다음과 같이 입력합니다. 

```
DATABASES={
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '(데이터베이스 이름)',
        'USER': '(DB 접속 계정명)',
        'PASSWORD': '(해당 DB 접속 계정 비밀번호)',
        'HOST': '(실제 DB 주소)',
        'PORT': '(포트 번호)'
    }
}

SECRET_KEY = '(기존 settings.py에 있는 SECRET KEY 정보)'
```
3) settings.py에서 기존의 DATABASES와 SECRET_KEY를 주석 처리하고,

```
import my_settings

DATABASES=my_settings.DATABASES
SECRET_KEY=my_settings.SECRET_KEY
```

4) 터미널에 아래와 같이 입력합니다.

```
python manage.py inspectdb
```
inspectdb를 실행하면 자동으로 해당 db에 존재하는 테이블들이 터미널창에 출력됩니다. 출력된 테이블들을 models.py에 붙여넣고, 아래 코드를 입력합니다.

```
python manage.py makemigrations
python manage.py migrate
```

### 7. API 개발

1) 아래와 같이 django rest framework 패키지 설치 후, 프로젝트 내 settings.py 내에 있는 INSTALLED_APPS에 'rest_framework'를 추가합니다.

```
pip install djangorestframework
```


2) 프로젝트 내 urls.py

```
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('', include('image_api.urls'), name='image_api'),
]
```


3) 프로젝트 내 앱 안의 urls.py(새로 생성)

```
from django.urls import path
from . import views
 
app_name = 'image_api'
urlpatterns = [
    path('get_task', views.ImageView.get_assign),
    path('put_task/<int:image_id>', views.ImageView.put_result)
]
```


4) 앱 내 serializers.py(새로 생성)

```
from rest_framework import serializers
from .models import Annotations

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotations
        fields='__all__'
```

5) 실행
```
python3 manage.py runserver
```

6) get, post, put method 확인

postman을 통해 확인합니다.

설치 링크  https://www.postman.com/downloads/

터미널에서 python manage.py runserver을 입력하고, Postman을 통해서 key, value을 입력하여 post, put method를 사용하면 데이터베이스에 데이터를 새로 생성하거나 기존의 데이터를 업데이트할 수 있습니다. get method를 사용하면 작업되지 않은 이미지 id와 url 쌍을 요청하게 됩니다.
