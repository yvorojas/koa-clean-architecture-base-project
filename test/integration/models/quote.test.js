describe('quote model test', () => {
  let quoteModel = require('../../../src/models/quote');

  test('should fail if model is invalid', ()=>{

    const quote = {
        message: 'INVALID_MODEL'
    };

    expect(()=>{quoteModel.validate(quote)}).toThrowError();

  });

  test('should success if model is valid', ()=>{

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
      }, {
        id: 'DUMMY_ID_2',
        name: 'DUMMY_NAME_2',
        features: 'DUMMY_FEATURES_2',
        benefits: 'DUMMY_BENEFITS_2',
        details: 'DUMMY_DETAILS_2',
        premium_monthly: 400,
        premium_monthly_CLP: 500,
        images: ['DUMMY_IMAGE1_2', 'DUMMY_IMAGE2_2'],
        deductible: 3.2,
        product: {
          name: 'DUMMY_PRODUCT_NAME_2',
        },
        contract_period: 'DUMMY_CONTRACT_PERIOD_2',
        comparing: 'DUMMY_COMPARING_2',
        campaign: 'DUMMY_CAMPAIGN_2',
        company: {
          id: 'DUMMY_COMPANY_ID_2',
          name: 'DUMMY_COMPANY_NAME_2',
          sells_amount: 600,
        },
      },
      ];
  
      const quote = {
        id: 1,
        ordinal: 1,
        branch: 1,
        plans: dummyPlans,
      };

    expect(()=>{quoteModel.validate(quote)}).not.toThrowError();

  });
});