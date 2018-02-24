FROM node:8.9.4
MAINTAINER Chunghee park <dev.roy.park@gmail.com>

WORKDIR /app
ADD    ./package.json         /app/
RUN    npm install

ADD    ./src/                 /app/src/

CMD ["npm", "start"]
