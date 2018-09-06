const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const rutExtension = require('./extensions/rut');

const Joi = BaseJoi
  .extend(DateExtension)
  .extend(rutExtension);

const schema = Joi.object().keys({
  email: Joi.string().email().required().error(new Error('invalid email (format xxxxx@xxxx.xx).')),
  birthdate: Joi.string().isoDate().required().error(new Error('invalid date (must be a ISO string format).')),
  document_id: Joi.string().rut().required().error(new Error('invalid document id.')),
  plan: Joi.string().required().error(new Error('invalid plan.')),
});

const validate = quoteForm => Joi.validate(quoteForm, schema, (err, value) => {
  if (err) {
    throw Error(err);
  }
  return value;
});

module.exports = {
  validate,
};
