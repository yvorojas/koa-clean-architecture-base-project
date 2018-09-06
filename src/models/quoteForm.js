const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const rutExtension = require('./extensions/rut');
const { LIFE_INSURANCE_PRODUCT } = require('../commons/constants');
const lifeInsuranceParamsModel = require('./lifeInsuranceParams');

const Joi = BaseJoi
  .extend(DateExtension)
  .extend(rutExtension);

const schema = Joi.object().keys({
  params: Joi.object().required().error(new Error('invalid params')),
  category: Joi.number().integer().required().error(new Error('invalid category')),
  product: Joi.number().integer().required().error(new Error('invalid product')),
});

const isValidParams = (product, params) => {
  let isValid = false;
  switch (product) {
    case LIFE_INSURANCE_PRODUCT:
      isValid = lifeInsuranceParamsModel.validate(params);
      break;
    default:
      break;
  }
  return isValid;
};

const validate = quoteForm => Joi.validate(quoteForm, schema, (err, value) => {
  if (err) {
    throw Error(err);
  }
  try {
    const isValid = isValidParams(value.product, value.params);
    if (!isValid) {
      throw Error('params validation failed: product not configured.');
    }
  } catch (ex) {
    throw Error(ex);
  }
  return value;
});

module.exports = {
  validate,
};
