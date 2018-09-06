const Router = require('koa-router');
const apiSpecifications = require('./api-specs/swagger');
const routerV1 = require('./controllers/v1/router');
const pkginfo = require('../package.json');

const router = new Router();

router.get('/health', (ctx) => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
  };

  ctx.body = {
    data,
    message: 'your API is healthy',
  };
});

router.get('/specs', (ctx) => {
  ctx.body = apiSpecifications.getSpec();
});
router.use(routerV1.routes());


module.exports = router;
