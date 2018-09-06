const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('model mapper test', () => {
    
    let mapper;
    let quoteCardModel;

    beforeEach(() => {
        mapper = require('../../../src/models/mapper');
        quoteCardModel = require('../../../src/models/quoteCard');
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('should return success when call to quote card method with correct model', () => {
        quoteCardModel.validate = () => {
            return {
                message: 'DUMMY_BODY'
            };
        }

        const plan = {
            id: 'DUMMY_ID',
            name: 'DUMMY_NAME',
            features: 'DUMMY_FEATURES',
            benefits: 'DUMMY_BENEFITS',
            details: 'DUMMY_DETAILS',
            premium_monthly: 100,
            premium_monthly_CLP: 200,
            images: ['DUMMY_IMAGE1', 'DUMMY_IMAGE2'],
            deductible: 2.1,
            product: {
                name: 'DUMMY_PRODUCT_NAME',
            },
            contract_period: 'DUMMY_CONTRACT_PERIOD',
            comparing: 'DUMMY_COMPARING',
            campaign: 'DUMMY_CAMPAIGN',
            company: {
                id: 'DUMMY_COMPANY_ID',
                name: 'DUMMY_COMPANY_NAME',
                sells_amount: 300,
            },
        }
        const result = mapper.toQuoteCardModel(plan);
        expect(result).toEqual({
            message: 'DUMMY_BODY'
        });
    });

    test('should return success  when call to quote card array method', () => {
        quoteCardModel.validate = () => {
            return {
                message: 'DUMMY_BODY'
            };
        }

        const dummyPlans = [{
            id: 'DUMMY_ID',
            name: 'DUMMY_NAME',
            features: 'DUMMY_FEATURES',
            benefits: 'DUMMY_BENEFITS',
            details: 'DUMMY_DETAILS',
            premium_monthly: 100,
            premium_monthly_CLP: 200,
            images: ['DUMMY_IMAGE1', 'DUMMY_IMAGE2'],
            deductible: 2.1,
            product: {
              name: 'DUMMY_PRODUCT_NAME',
            },
            contract_period: 'DUMMY_CONTRACT_PERIOD',
            comparing: 'DUMMY_COMPARING',
            campaign: 'DUMMY_CAMPAIGN',
            company: {
              id: 'DUMMY_COMPANY_ID',
              name: 'DUMMY_COMPANY_NAME',
              sells_amount: 300,
            },
          },
          ];
      
          const quote = {
            id: 1,
            ordinal: 1,
            branch: 1,
            plans: dummyPlans,
          };

        const result = mapper.toQuoteCardModelArray(quote);
        expect(result).toEqual([{
            message: 'DUMMY_BODY'
        }]);
    });
});