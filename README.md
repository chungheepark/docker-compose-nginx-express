#Nginx nodejs proxy using Docker Compose
Docker와 Docker-compose를 이용하여 개발환경을 구성한다.

## 프로젝트 실행시키기
1. build 및 실행
```bash
$ docker-compose up
```

2. 중지
```bash
# 구동죽인 터미널에서 Ctrl + c
# 혹은 아래 명령어 실행
$ docker-compose down
```
* 만약 빌드를 다시하고 싶다면?
```bash
$ docker-compose up --build
```

## What is docker?
* 리눅스 기반의 OS 가상화 환경을 만들어준다.
* 컨테이너 & 이미지 라는 개념을 사용한다.
* 윈도우에서도 도커를 이용하여 리눅스 서버 환경을 구성할 수 있다.
* 이미지: 컨테이너를 생성할 수 있는 레시피 같은것으로 이해하면 편함.
* 다른 이미지를 상속(?) 받아 자신의 이미지를 만드는 것도 가능.

## What is docker-compose?
* Docker의 여러 컨테이너를 실행시켜준다.
* 컨테이너간 디펜던시도 설정할 수 있다.
* Docker만 사용하면 어려운 명령어를 설정에 정의 해놓으면, 편하게 사용할 수 있다.
* 다른 이미지를 기반으로 자신의 이미지를 만듬. ( ```FROM``` )

## Dockerfile 설명
```dockerfile
FROM # 베이스 이미지
MAINTAINER # 개발자
WORKDIR # docker 내에서의 작업 디렉토리 설정
ADD # 파일 추가
RUN # 해당 명령을 실행
```

## Docker 명령어
### 빌드
```bash
# 1. Docker 빌드하기
# docker build -t DIRECTORY_NAME .
$ docker build -t docker-node-nginx
```

### 컨테이너 실행
```bash
# 2. 도커 실행하기
# docker run [옵션] 이미지이름[:태그] [명령어] [전달인자]
#
$ docker run -it --rm \
    -p 8000:8000 \
    docker-node-nginx \
    node src/index.js
    -e NODE_ENV=development
    --volume=$(pwd)/src:/app/src
    
# -it: 원래 컨테이너가 데몬 형식으로 도는데, 인터랙션 할 수 있도록 실행한다.
# --rm: 컨테이너 종료시 삭제
# -p: 컨테이너 내부와 연결할 포트 설정
# node src/index.js: 실행할 명령어 전달
# -e NODE_ENV=development: 컨테이너의 환경변수 설정
# --volume=$(pwd)/src:/app/src : 호스트의 src 폴더를 컨테이너의 /app/src폴더에 연결
```

### 그 외
```bash
$ docker ps -a # 실행중인 컨테이너 확인. -a 옵션으로 자세하게 나옴.
$ docker stop CONTAINER_ID #  실행중인 컨테이너 정지
$ docker rm -f CONTAINER_ID # 실행중인 컨테이너 삭제. -f 옵션으로 정지해버리고 삭제함.
$ docker images -a # 현재 로컬에 빌드된 image 확인
$ docker rmi IMAGE_ID # 이미지 삭제
```

## Docker-compose 옵션 설명
```dockerfile
version # docker-compose에서 사용할 포매팅
services # docker-compose에서 사용할 컨테이너들 정의
build # 컨테이너 빌드 방법. image 베이스로 할 수 있고, Dockerfile 위치 기술 가능
links # 다른 컨테이너와 연결시킴
ports # 외부와 연결할 포트 설정
volumes # 호스트의 파일시스템을 컨테이너가 공유
command # 컨테이너가 실행할 명령어 기술 
```

## 참고링크
http://seokjun.kr/docker-nginx-node/
http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/

## Trouble shooting
+ 이미지 빌드를 할 수 없다고 나옴.
  + 해당 이미지를 사용중인 컨테이너가 작동중일 수 있음.
  + 컨테이너 확인 후 삭제. 이미지 확인 후 삭제.
+ 윈도우10에서 volume 마운트 실패
  + 도커 설정에서 드라이브 공유 옵션을 활성화 시켜야함.
+ docker-compose 실행시 api, media 빌드할 때 에러 발생
  + dos2unix 명령어를 실행하여 각 start-dev.sh에 적용.
  + start-dev.sh에 ```#!/bin/bash```로 되어 있다면 ```#!/bin/sh```로 적용.
    + 경량화 OS를 사용중이기 때문에 bash쉘이 안깔려 있는 애들이 있음.
    + 경량화 OS를 사용하게 되면 없는 명령어가 많기 때문에 패키지 관리자를 통해 설치해야함. 주의.
