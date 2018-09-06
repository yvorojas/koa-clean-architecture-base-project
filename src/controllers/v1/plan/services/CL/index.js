const quoteApi = require('../../../../../services/quoteApi');

const getPlansToQuote = async (ctx) => {
  let plans;

  if (ctx.query === null || ctx.query === undefined) {
    ctx.throw(500, 'not defined query params (category and/or product)');
  }

  if (ctx.query.product === null || ctx.query.product === undefined || ctx.query.product.trim() === '') {
    ctx.throw(500, 'product is required');
  }

  if (ctx.query.category === null || ctx.query.category === undefined || ctx.query.category.trim() === '') {
    ctx.throw(500, 'category is required');
  }

  try {
    plans = await quoteApi.getPlansToQuote(Object.assign({}, ctx.params, ctx.query));
    ctx.response.body = plans;
  } catch (ex) {
    ctx.throw(500, ex.message);
  }
};

module.exports = {
  getPlansToQuote,
};
