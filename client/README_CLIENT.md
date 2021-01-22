‘Bounding Box Tool'을 사용하면 이미지 내에 Bounding Box를 그릴 수 있습니다.
마우스를 통해 그린 Bounding Box의 좌표와 체크박스 내 속성값에 대한 정보를 저장할 수 있습니다.


‘Bounding Box Tool'의 FE(Frontend) 환경을 구축하기 위해서는 아래 내용을 참고해야 합니다.


### 1. node.js가 설치되어 있지 않은 환경이라면, 다음 링크를 따라 설치해야 합니다.


- https://nodejs.org/ko/download/

잘 설치되었는지 확인하기 위해서 버전 확인이 가능한 명령어를 터미널에 입력합니다.


```
node -v
```
node.js의 버전이 확인된다면, 다음 항목으로 넘어가면 됩니다.
참고로, npm 설치는 node.js 설치 시에 자동으로 함께 진행됩니다.



### 2. react 웹 프레임워크를 동작시키기 위한 npm 관련 설치 내용입니다.

'Getting Started Create React App’
 - https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md 



### 3. 만약, npm 버전 관련 업그레이드가 필요하다면 해당 프로젝트의 디렉토리 위치에서 터미널에 아래와 같이 입력합니다.

```
npm update
```

위 과정에서 일부 주요 릴리스가 업데이트 되지 않을 수 있습니다.
이러한 상황에서는 아래 내용을 참고하면 됩니다.
```
npm install -g npm-check-updates
```

### 4. 실행

```
npm start
```
