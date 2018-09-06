const Router = require('koa-router');
const routerV1 = require('./v1');

const router = new Router();

router.use(routerV1.routes());

module.exports = router;
