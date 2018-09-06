const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const fs = require('fs');
const koaSwagger = require('koa2-swagger-ui');
const apiSpecifications = require('./api-specs/swagger');

const router = require('./router');

const app = new Koa();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

let pathsToSupressOauth = [];
let protocol = [];

switch (env) {
  case ('development'):
    pathsToSupressOauth = [
      '/specs',
      '/explorer'];
    protocol = ['http'];
    break;
  default:
    protocol = ['https'];
    break;
}

const options = apiSpecifications.getOptions();
options.swaggerDefinition.schemes = protocol;
apiSpecifications.modifyOptions(options);
apiSpecifications.initialize();

pathsToSupressOauth.push('/health');

const pubKey = fs.readFileSync('./src/certs/bff.pub');

app
  .use((ctx, next) => next().catch((err) => {
    ctx.status = err.status;
    switch (err.status) {
      case 401:
        ctx.body = 'Protected resource, use Authorization header to get access\n';
        break;
      default:
        ctx.body = err.message;
        break;
    }
  }))
  .use(jwt({ secret: pubKey }).unless(
    {
      method: 'OPTIONS',
      path: pathsToSupressOauth,
    },
  ))
  .use(bodyParser())
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }))
  .use(router.routes())
  .use(
    koaSwagger({
      routePrefix: '/explorer',
      swaggerOptions: {
        url: process.env.SWAGGER_SPECS,
      },
    }),
  );


app.listen(port, () => {
  /* eslint-disable */
  console.log(`Server running on port ${port}, environment: ${env}`);
  /* eslint-enable */
});
