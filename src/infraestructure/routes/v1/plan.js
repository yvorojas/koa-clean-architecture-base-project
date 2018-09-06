const Router = require('koa-router');
const PlanController = require('../../../interfaces/controllers/v1/PlanController');
const controller = new PlanController();

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
router.get('/', controller.getPlansToQuote);

module.exports = router;
