/**
 * @swagger
 * definitions:
 *   Plan:
 *     type: object
 *     description: quoted plan model
 *     properties:
 *       id:
 *         type: string
 *         description: plan identifier
 *       name:
 *         type: string
 *         description: plan name
 *       features:
 *         type: string
 *         description: plan features
 *       benefits:
 *         type: string
 *         description: plan benefits
 *       details:
 *         type: string
 *         description: plan details
 *       premiumMonthly:
 *         type: string
 *         description: plan premium monthly
 *       premiumMonthlyCLP:
 *         type: string
 *         description: plan premium monthly in chilean currency
 *       images:
 *         type: string
 *         description: plan images array
 *       deductible:
 *         type: string
 *         description: plan deductible
 *       product:
 *         description: plan product details
 *         type: object
 *         $ref: "#/definitions/Product"
 *       contractPeriod:
 *         type: string
 *         description: plan contract period
 *       comparing:
 *         type: string
 *         description: plan comparing
 *       campaign:
 *         type: string
 *         description: plan campaign
 *       company:
 *         description: insurance company
 *         type: object
 *         $ref: "#/definitions/Company"
 *   PlanToQuote:
 *     type: object
 *     description: plan info, necesary value to perform quote
 *     properties:
 *       value:
 *         type: string
 *         description: plan identifier
 *       name:
 *         type: string
 *         description: plan label to show in front end
*/
