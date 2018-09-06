const request = require('request');
const util = require('util');
const PlanRepository = require('../../interfaces/storage/PlanRepository');

module.exports = class extends PlanRepository {

  constructor(configurationData) {
    super();
    this.configuration = configurationData;
  }

  get(planParamsEntity) {
    const version = '/v1/';
    const requestOptions = {
        uri: `${this.configuration.API_COTIZACION_URL}${version}${planParamsEntity.country}${util.format(this.configuration.GET_PLANS_TO_QUOTE_METHOD, planParamsEntity.category, planParamsEntity.product)}`,
        headers: {
        Authorization: `Bearer ${this.configuration.API_COTIZACION_TOKEN}`,
        },
        json: true,
    };

    return new Promise((resolve, reject) => {
        request.get(requestOptions, (err, res) => {
        if (err) return reject(err);
        if (this.configuration.VALID_STATUS_CODES.indexOf(res.statusCode) < 0) {
            const error = {
            statusCode: res.statusCode,
            body: res.body,
            };
            return reject(error);
        }
        return resolve(res.body);
        });
    }); 
  }

};