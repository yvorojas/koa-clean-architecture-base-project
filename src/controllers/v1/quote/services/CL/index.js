const quoteFormModel = require('../../../../../models/quoteForm');
const mapper = require('../../../../../models/mapper');
const quoteApi = require('../../../../../services/quoteApi');

const obtainPlans = async (ctx) => {
  if (ctx.request === null) {
    ctx.throw(500, 'request cannot be null');
  }

  if (ctx.request.body === null || ctx.request.body === undefined) {
    ctx.throw(500, 'body cannot be null');
  }

  let quoteForm;

  try {
    quoteForm = quoteFormModel.validate(ctx.request.body);
  } catch (error) {
    ctx.throw(422, error.message);
  }

  try {
    const response = await quoteApi.getPlans(ctx.params, quoteForm);
    const quoteCard = await mapper.toQuoteCardModelArray(response.body);
    ctx.response.body = quoteCard;
    ctx.status = response.statusCode;
  } catch (ex) {
    if (ex.statusCode) {
      ctx.throw(ex.statusCode, ex.body);
    } else {
      ctx.throw(500, ex.message);
    }
  }
};

module.exports = {
  obtainPlans,
};
