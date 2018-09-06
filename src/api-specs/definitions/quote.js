/**
 * @swagger
 * definitions:
 *   NewQuote:
 *     type: object
 *     description: model for perform quote
 *     required:
 *       - category
 *       - product
 *       - params
 *     properties:
 *       category:
 *         description: category identifier to perform quote
 *         type: number
 *       product:
 *         description: product identifier to perform quote
 *         type: number
 *       params:
 *         description: custom params to quote in specific product
 *         type: object
 *   Quote:
 *     type: object
 *     description: model for obtained quote
 *     properties:
 *       id:
 *         type: number
 *         description: quote identifier
 *       ordinal:
 *         type: number
 *         description: quote ordinal number
 *       branch:
 *         type: number
 *         description: quote branch
 *       plans:
 *         type: array
 *         items:
 *             type: object
 *             $ref: "#/definitions/Plan"
 */
