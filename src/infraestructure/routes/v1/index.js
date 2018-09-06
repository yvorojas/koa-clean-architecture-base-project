const Router = require('koa-router');
const planRouter = require('./plan');
const quoteRouter = require('./quote');

const router = new Router({
  prefix: '/v1',
});

router.use(planRouter.routes());
router.use(quoteRouter.routes());

module.exports = router;
