FROM node:carbon-alpine

WORKDIR /app

RUN apk --update --no-cache add curl

RUN yarn global add pm2


COPY package.json ./
COPY yarn.lock ./

ARG CONSUL_TEMPLATE_VERSION=0.19.4
ADD "https://releases.hashicorp.com/consul-template/0.19.4/consul-template_0.19.4_linux_amd64.tgz" /
RUN tar zxf /consul-template_0.19.4_linux_amd64.tgz
COPY inc/create-ecosystem.hcl inc/create-cert.hcl inc/entrypoint.sh inc/ecosystem.ctmpl inc/cert.ctmpl /

RUN chmod 755 /entrypoint.sh

RUN yarn

COPY . .

ENTRYPOINT ["/entrypoint.sh"]
