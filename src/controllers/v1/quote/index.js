const Router = require('koa-router');
// const services = require('./services');

const router = new Router({
  prefix: '/:country/quote',
});

/**
 * @swagger
 * /v1/{country}/quote:
 *   post:
 *     tags: [
 *        quote
 *     ]
 *     security:
 *       - Bearer: []
 *     summary: "Return plans according a input quote data"
 *     operationId: obtainPlans
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: country
 *         type: string
 *         required: true
 *         description: country base
 *         enum: [CL]
 *         default: CL
 *       - name: quote
 *         description: "quote to obtain plans"
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/NewQuote"
 *     responses:
 *       200:
 *          description: "quote obtained"
 *          schema:
 *            $ref: "#/definitions/Quote"
 *       401:
 *          description: "Unauthorized"
 *          schema:
 *            type: string
 *       422:
 *          description: "Unprocessable Entity"
 *          schema:
 *            type: string
 *       500:
 *          description: "Internal Server Error"
 *          schema:
 *            type: string
 *       default:
 *          description: "Unexpected error"
 *          schema:
 *            $ref: "#/definitions/ErrorModel"
 */
router.post('/', async (ctx) => {
  if (ctx.params === null || ctx.params === undefined) {
    ctx.throw(500, 'country param is required');
  }

  if (ctx.params.country === null || ctx.params.country === undefined || ctx.params.country.trim() === '') {
    ctx.throw(500, 'country param is required');
  }

  let serviceByCountry;
  const country = ctx.params.country.toUpperCase().trim();

  try {
    /* eslint-disable */
    serviceByCountry = require(`../quote/services/${country}`);
    /* eslint-enable */
  } catch (ex) {
    ctx.throw(404, `service for country ${country} not implemented`);
  }

  if (!serviceByCountry.obtainPlans) {
    ctx.throw(404, `service for country ${country} not implemented`);
  }

  await serviceByCountry.obtainPlans(ctx);
});

module.exports = router;
