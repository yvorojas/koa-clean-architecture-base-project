FROM node:carbon-alpine

WORKDIR /app

RUN apk --update --no-cache add curl

RUN yarn global add pm2


COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
