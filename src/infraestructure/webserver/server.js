const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

let server;

const create = () => {
    server = new Koa();
    server.use(bodyParser())
    .use(cors({
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }));

    return server;
}

const inject = (func) => {
    server.use(func);
}

const listen = (port, env) => {
    server.listen(port, () => {
        /* eslint-disable */
        console.log(`Server running on port ${port}, environment: ${env}`);
        /* eslint-enable */
      });
}

module.exports = {
    create,
    inject,
    listen,
};



