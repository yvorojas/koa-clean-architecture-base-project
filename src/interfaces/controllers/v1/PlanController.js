const GetPlansToQuote = require('../../../application/use_cases/GetPlansToQuote/v1');
const PlanRepository = require('../../../application/repositories/PlanRepository');
const environmentVariables = require('../../../infraestructure/EnvironmentVariables')();

module.exports = class {

    constructor() {
      this.repository = new PlanRepository(environmentVariables.load());
    }
  
    async getPlansToQuote(ctx) {
        if (ctx.params === null || ctx.params === undefined) {
            ctx.throw(500, 'country param is required');
            }
        
            if (ctx.params.country === null || ctx.params.country === undefined || ctx.params.country.trim() === '') {
            ctx.throw(500, 'country param is required');
            }

            const params = Object.assign({}, ctx.params, ctx.query);

            params.country = params.country.toUpperCase().trim();

            try {
                ctx.response.body = await this.useCase.execute(params);
            }
            catch(ex){
                ctx.throw(ex.statusCode, ex.message);
            }  
        }
  };