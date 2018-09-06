const Router = require('koa-router');
const planController = require('./plan');
const quoteController = require('./quote');

const router = new Router({
  prefix: '/v1',
});

router.use(planController.routes());
router.use(quoteController.routes());

module.exports = router;
