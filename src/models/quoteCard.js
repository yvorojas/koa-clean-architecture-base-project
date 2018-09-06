const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  priceCLP: Joi.number().integer().required(),
  deductible: Joi.number().required(),
  images: Joi.array().items(Joi.string()).required(),
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
