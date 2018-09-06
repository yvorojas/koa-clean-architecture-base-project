describe('quote form model test', () => {
    let quoteFormModel = require('../../../src/models/quoteForm');
  
    test('should fail if model is invalid', ()=>{
  
      const quoteForm = {
          message: 'INVALID_MODEL'
      };
  
      expect(()=>{quoteFormModel.validate(quoteForm)}).toThrowError();
  
    });

    test('should success if model is valid', ()=>{
        const quoteForm = {
            "category": 2,
            "product": 20215,
            "params": {
                "document_id": "1-9",
                "email": "test@test.test",
                "birthdate":"2018-08-28T15:26:32.612Z",
                "plan":"dummy_plan",
            }
        };
        expect(()=>{quoteFormModel.validate(quoteForm)}).not.toThrowError();
    });

    test('should fail with document id error if model document id is invalid', ()=>{
        const quoteForm = {
            "category": 2,
            "product": 20215,
            "params": {
                "document_id": "INVALID_DOCUMENT_ID",
                "email": "test@test.test",
                "birthdate":"2018-08-28T15:26:32.612Z",
                "plan":"dummy_plan",
            }
        };
        try{
            quoteFormModel.validate(quoteForm)
        }catch(ex){
            expect(ex.message).toEqual('Error: Error: invalid document id.');
        }
    });

    test('should fail with product not configurer error if send product is not configured', ()=>{
        const quoteForm = {
            "category": 2,
            "product": 99999, // not configured value
            "params": {
                "document_id": "1-9",
                "email": "yvo.rojas.valdes@gmail.com",
                "birthdate":"2018-08-28T15:26:32.612Z",
                "plan":"dummy_plan",
            }
        };
        try{
            quoteFormModel.validate(quoteForm)
        }catch(ex){
            expect(ex.message).toEqual('Error: params validation failed: product not configured.');
        }
    });
}); 