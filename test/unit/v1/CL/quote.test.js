const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('quote test', () => {
  let quoteServices;
  let quoteApi;
  let mapper;

  beforeEach(() => {
    quoteForm = require('../../../../src/models/quoteForm');
    quoteServices = require('../../../../src/controllers/v1/quote/services/CL');
    quoteApi = require('../../../../src/services/quoteApi');
    mapper = require('../../../../src/models/mapper');
  });

  afterEach(() => {
    sandbox.restore();
  })

  test('should fail if request is empty when call to obtain Plans method', async () => {
    
    const ctx = {
      request: null,
      throw: (code, message) => {
        throw Error(message);
      },
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('request cannot be null');
    }
  });

  test('should fail if body is empty when call to obtain Plans method', async () => {
    const ctx = {
      request: {
        body: null
      },
      throw: (code, message) => {
        throw Error(message);
      },
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('body cannot be null');
    }
  });

  test('should fail if body is undefined when call to obtain Plans method', async () => {
    const ctx = {
      request: {},
      throw: (code, message) => {
        throw Error(message);
      },
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('body cannot be null');
    }
  });

  test('should fail if request not send correct quote in obtain Plans method', async () => {
    const error = new Error('DUMMY_ERROR');

    sandbox.stub(quoteForm, 'validate').throws(error);
    
    const ctx = {
      request: {
        body: {},
      },
      throw: (code, message) => {
        throw Error(message);
      },
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('DUMMY_ERROR');
    }
  });

  test('should fail if quoteApi reject response in obtain Plans method', async () => {
    sandbox.stub(quoteForm, 'validate').returns({
      birthdate: new Date().toISOString(),
      email: 'test@test.com',
      rut: '1-9',
      plan: 'dummy_plan'
    });

    sandbox.stub(quoteApi, 'getPlans').rejects({
      message : 'DUMMY_ERROR'
    });
    
    const ctx = {
      request: {
        body: {},
      },
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('DUMMY_ERROR');
    }
  });

  test('should fail if quoteApi reject response with statusCodev in obtain Plans method', async () => {
    sandbox.stub(quoteForm, 'validate').returns({
      birthdate: new Date().toISOString(),
      email: 'test@test.com',
      rut: '1-9',
      plan: 'dummy_plan'
    });

    sandbox.stub(quoteApi, 'getPlans').rejects({
      body:  'DUMMY_ERROR',
      statusCode: 'DUMMY_STATUS_CODE'
    });
    
    const ctx = {
      request: {
        body: {},
      },
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    try {
      await quoteServices.obtainPlans(ctx);
    } catch (e) {
      expect(e.message).toEqual('DUMMY_ERROR');
    }
  });

  test('should success if quoteApi response is correct', async() => {
    sandbox.stub(quoteForm, 'validate').returns({
      birthdate: new Date().toISOString(),
      email: 'test@test.com',
      rut: '1-9',
      plan: 'dummy_plan'
    });

    sandbox.stub(quoteApi, 'getPlans').resolves({
      body: {
        message: 'DUMMY_BODY',
      },
      statusCode : 'DUMMY_STATUS'
    });

    sandbox.stub(mapper, 'toQuoteCardModelArray').resolves({
      message: 'DUMMY_BODY'
    });

    const ctx = {
      request: {
        body: {},
      },
      throw: (code, message) => {
        throw Error(message);
      },
      response: {},
      params: {
        country: 'DUMMY_COUNTRY',
      },
    };

    await quoteServices.obtainPlans(ctx);
    expect(ctx.response.body).toEqual({message: 'DUMMY_BODY'});
    expect(ctx.status).toEqual('DUMMY_STATUS');
  });
});
