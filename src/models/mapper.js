const quoteModel = require('./quote');
const quoteCardModel = require('./quoteCard');

const toQuoteCardModel = (plan) => {
  const quoteCard = {
    id: plan.id,
    name: plan.name,
    price: plan.premium_monthly,
    priceCLP: plan.premium_monthly_CLP,
    deductible: plan.deductible,
    images: plan.images,
  };
  return quoteCardModel.validate(quoteCard);
};


const toQuoteCardModelArray = (quote) => {
  const validatedQuote = quoteModel.validate(quote);
  const quoteCardArray = [];
  validatedQuote.plans.forEach((plan) => {
    quoteCardArray.push(toQuoteCardModel(plan));
  });
  return quoteCardArray;
};

module.exports = {
  toQuoteCardModel,
  toQuoteCardModelArray,
};
