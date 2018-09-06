const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const bootstrap = require('../../drivers/bootstrap');
const request = require('request');

describe('quote api test', () => {
    let quoteApi;
    let request;
    let defaultParams;

    beforeAll(() => {
        bootstrap.setEnvironment();
    });

    beforeEach(() => {
        request = require('request');
        quoteApi = require('../../../src/services/quoteApi');
        defaultParams = {
            country: 'DUMMY_COUNTRY',
            category: 'DUMMY_CATEGORY',
            product: 'DUMMY_PRODUCT',
        }
      });

    afterEach(() => {
        sandbox.restore();
      })

    test('should fail if request fail in get plans method', (done) => {
        sandbox.stub(request, 'post').callsArgWith(1,{} , null);

        quoteApi.getPlans(defaultParams)
        .then(()=>{
        }).catch((err)=>{
            expect(err).toEqual({});
            done();
        });
    });

    test('should success if request ok in get plans method', (done) => {
        const requestOk = {
            body: {
                message: 'OK',
            },
            statusCode : 200,
        }
        sandbox.stub(request, 'post').callsArgWith(1,null,requestOk);
        quoteApi.getPlans(defaultParams)
        .then((res)=>{
            expect(res).toEqual(requestOk);
            done();
        });
    });

    test('should fail if request send invalid status code for correct response in get plans method', (done) => {
        const requestFail = {
            body: {
                message: 'bad',
            },
            statusCode : 500,
        }
        sandbox.stub(request, 'post').callsArgWith(1,null,requestFail);
        quoteApi.getPlans(defaultParams)
        .then((res)=>{
            expect(res).toEqual(requestFail);
            done();
        }).catch((err)=>{
            expect(err).toEqual(requestFail);
            done();
        });
    });

    test('should fail if request fail in get plans to quote method', (done) => {
        sandbox.stub(request, 'get').callsArgWith(1,{} , null);
        quoteApi.getPlansToQuote(defaultParams)
        .then(()=>{
        }).catch((err)=>{
            expect(err).toEqual({});
            done();
        });
    });

    test('should success if request ok in get plans to quote method', (done) => {
        const requestOk = {
            body: {
                message: 'OK',
            },
            statusCode: 200
        }
        sandbox.stub(request, 'get').callsArgWith(1,null,requestOk);
        quoteApi.getPlansToQuote(defaultParams)
        .then((res)=>{
            expect(res).toEqual(requestOk.body);
            done();
        });
    });

    test('should fail if request send invalid status code for correct response in get plans to quote method', (done) => {
        const requestFail = {
            body: {
                message: 'bad',
            },
            statusCode: 500
        }
        sandbox.stub(request, 'get').callsArgWith(1,null,requestFail);
        quoteApi.getPlansToQuote(defaultParams)
        .then((res)=>{
            expect(res).toEqual(requestOk.body);
            done();
        }).catch((err)=>{
            expect(err).toEqual(requestFail);
            done();
        });
    });
});