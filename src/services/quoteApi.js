const request = require('request');
const util = require('util');
const { GET_PLANS_TO_QUOTE_METHOD, GET_QUOTE_PLAN_METHOD, VALID_STATUS_CODES } = require('../commons/constants');

const baseUrl = process.env.API_COTIZACION_URL;
const authToken = process.env.API_COTIZACION_TOKEN;

const getPlans = (params, quote) => {
  const version = '/v1/';
  const requestOptions = {
    uri: `${baseUrl}${version}${params.country}${GET_QUOTE_PLAN_METHOD}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: quote,
    json: true,
  };

  return new Promise((resolve, reject) => {
    request.post(requestOptions, (err, res) => {
      if (err) return reject(err);
      const result = {
        statusCode: res.statusCode,
        body: res.body,
      };
      if (VALID_STATUS_CODES.indexOf(result.statusCode) < 0) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const getPlansToQuote = (params) => {
  const version = '/v1/';
  const requestOptions = {
    uri: `${baseUrl}${version}${params.country}${util.format(GET_PLANS_TO_QUOTE_METHOD, params.category, params.product)}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request.get(requestOptions, (err, res) => {
      if (err) return reject(err);
      if (VALID_STATUS_CODES.indexOf(res.statusCode) < 0) {
        const error = {
          statusCode: res.statusCode,
          body: res.body,
        };
        return reject(error);
      }
      return resolve(res.body);
    });
  });
};

module.exports = {
  getPlans,
  getPlansToQuote,
};
