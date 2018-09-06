const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');

const Joi = BaseJoi.extend(DateExtension);

const schema = Joi.object().keys({
  id: Joi.number().integer().required().error(new Error('invalid id')),
  ordinal: Joi.number().integer().required().error(new Error('invalid ordinal.')),
  branch: Joi.number().integer().required().error(new Error('invalid branch.')),
  plans: Joi.array().items(Joi.object().keys({
    id: Joi.string().required().error(new Error('invalid plan id.')),
    name: Joi.string().required().error(new Error('invalid plan name.')),
    features: Joi.string().allow(null).error(new Error('invalid plan features.')),
    benefits: Joi.string().allow(null).error(new Error('invalid plan benefits.')),
    details: Joi.string().allow(null).error(new Error('iinvalid plan details.')),
    premium_annual: Joi.number().allow(null).error(new Error('invalid plan premium monthly.')),
    premium_monthly: Joi.number().required().error(new Error('invalid plan premium monthly.')),
    premium_monthly_CLP: Joi.number().integer().required().error(new Error('invalid plan premium monthly CLP.')),
    images: Joi.array().items(Joi.string().allow(null)).required().error(new Error('invalid plan images')),
    deductible: Joi.number().required().error(new Error('invalid plan deductible.')),
    contract_period: Joi.string().allow(null).error(new Error('invalid plan contract period.')),
    comparing: Joi.string().allow(null).error(new Error('invalid plan comparing.')),
    campaign: Joi.string().allow(null).error(new Error('invalid plan campaign.')),
    company: Joi.object().keys({
      id: Joi.string().required().error(new Error('invalid plan company id.')),
      name: Joi.string().required().error(new Error('invalid plan company name.')),
      sells_amount: Joi.number().allow(null).error(new Error('invalid plan company sells amount.')),
    }).allow(null),
    product: Joi.object().keys({
      name: Joi.string().required(),
    }).allow(null),
  })).allow(null),
});

const validate = quote => Joi.validate(quote, schema, (err, value) => {
  if (err) {
    throw Error(err);
  }
  return value;
});

module.exports = {
  validate,
};
