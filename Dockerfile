FROM node:16
LABEL maintainer="Wonderfilly Discord Bot Developers <github.com/raneo/wonderfilly>"

WORKDIR /home/node/app

RUN git clone https://github.com/raneo/wonderfilly.git ./
RUN npm install
COPY config.json ./

USER node
CMD ["node", "index.js"]
