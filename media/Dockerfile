FROM node:8.9.4
MAINTAINER Chunghee park <dev.roy.park@gmail.com>

WORKDIR /app
ADD    ./package.json         /app/
RUN    npm install
RUN    apk add imagemagick-dev

ADD    ./src/                 /app/src/

CMD ["npm", "start"]
