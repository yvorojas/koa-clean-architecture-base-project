const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('quote test', () => {
  let planServices;
  let quoteApi;

  beforeEach(() => {
    planServices = require('../../../../src/controllers/v1/plan/services/CL');
    quoteApi = require('../../../../src/services/quoteApi');
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('should success if request send correctly quote in obtain Plans to quote method', async () => {

    sandbox.stub(quoteApi, 'getPlansToQuote').resolves([]);
    
    const ctx = {
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'DUMMY_COUNTRY',
      },
      query: {
        category: 'DUMMY_CATEGORY',
        product: 'DUMMY_PRODUCT',
      }
    };

    await planServices.getPlansToQuote(ctx);
    expect(Array.isArray(ctx.response.body)).toEqual(true);
  });

  test('should fail if quoteApi reject response in obtain Plans to quote method', async () => {
    sandbox.stub(quoteApi, 'getPlansToQuote').rejects({
      message : 'DUMMY_ERROR'
    });
    
    const ctx = {
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'DUMMY_COUNTRY',
      },
      query: {
        category: 'DUMMY_CATEGORY',
        product: 'DUMMY_PRODUCT',
      }
    };

    try {
      await planServices.getPlansToQuote(ctx);
    } catch (e) {
      expect(e.message).toEqual('DUMMY_ERROR');
    }
  });

  test('should fail if query params is null', async () => { 
    const ctx = {
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'CL',
      },
    };

    try {
      await planServices.getPlansToQuote(ctx);
    } catch (e) {
      expect(e.message).toEqual('not defined query params (category and/or product)');
    }
  });

  test('should fail if product query param is null', async () => { 
    const ctx = {
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'CL',
      },
      query: {},
    };

    try {
      await planServices.getPlansToQuote(ctx);
    } catch (e) {
      expect(e.message).toEqual('product is required');
    }
  });

  test('should fail if category query param is null', async () => { 
    const ctx = {
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'CL',
      },
      query: {
        product: 'DUMMY_PRODUCT'
      }
    };

    try {
      await planServices.getPlansToQuote(ctx);
    } catch (e) {
      expect(e.message).toEqual('category is required');
    }
  });
});
