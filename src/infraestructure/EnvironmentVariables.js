const ConfigurationEntity = require('../domain/entities/Configuration');
const pkginfo = require('../../package.json');

module.exports = class EnvironmentVariables {
  load() {

    const constants = {
        LIFE_INSURANCE_PRODUCT: 20215,
        GET_PLANS_TO_QUOTE_METHOD: '/plan?category=%s&product=%s',
        GET_QUOTE_PLAN_METHOD: '/quote',
        VALID_STATUS_CODES: [200, 201, 204],
    };

    const environment = {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        PREFIX: process.env.PREFIX,
        SWAGGER_SPECS: process.env.SWAGGER_SPECS,
        API_COTIZACION_URL: process.env.API_COTIZACION_URL,
        API_COTIZACION_TOKEN: process.env.API_COTIZACION_TOKEN,
    };

    const packageVars = {
        name: pkginfo.name,
        version: pkginfo.version,
        description: pkginfo.description,
        author: pkginfo.author,
    };

    const configurationEntity = new ConfigurationEntity(constants, environment, packageVars);

    return configurationEntity;
  }
}