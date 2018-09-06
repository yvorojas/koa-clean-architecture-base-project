const commonValidations = require('../../commons/validations');

module.exports = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    rut: 'invalid rut.',
  },
  rules: [
    {
      name: 'rut',
      validate(params, value, state, options) {
        if (!commonValidations.isRut(value)) {
          return this.createError('string.rut', { v: value }, state, options);
        }
        return value;
      },
    },
  ],
});
