const Router = require('koa-router');

const router = new Router({
  prefix: '/:country/plan',
});

/**
 * @swagger
 * /v1/{country}/plan:
 *   get:
 *     tags: [
 *        plan
 *     ]
 *     security:
 *       - Bearer: []
 *     summary: "Return plans to perform quote"
 *     operationId: getPlansToQuote
 *     parameters:
 *       - in: path
 *         name: country
 *         type: string
 *         required: true
 *         description: country base
 *         enum: [CL]
 *         default: CL
 *       - in: query
 *         name: category
 *         type: string
 *         required: true
 *         description: category base
 *       - in: query
 *         name: product
 *         type: string
 *         required: true
 *         description: product to extract plans to quote
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: "plan list"
 *          schema:
 *            type: array
 *            items:
 *               type: object
 *               $ref: "#/definitions/PlanToQuote"
 *       401:
 *          description: "Unauthorized"
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
router.get('/', async (ctx) => {
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
    serviceByCountry = require(`../plan/services/${country}`);
    /* eslint-enable */
  } catch (ex) {
    ctx.throw(404, `service for country ${country} not implemented`);
  }

  if (!serviceByCountry.getPlansToQuote) {
    ctx.throw(404, `service for country ${country} not implemented`);
  }

  await serviceByCountry.getPlansToQuote(ctx);
});

module.exports = router;
