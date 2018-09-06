describe('life insurance params model test', () => {
    let lifeInsuranceParamsModel = require('../../../src/models/lifeInsuranceParams');
  
    test('should fail if model is invalid', ()=>{
  
      const lifeInsuranceParams = {
          message: 'INVALID_MODEL'
      };
  
      expect(()=>{lifeInsuranceParamsModel.validate(lifeInsuranceParams)}).toThrowError();
  
    });

    test('should success if model is valid', ()=>{
  
        const lifeInsuranceParams = {
            "document_id": "1-9",
            "email": "test@test.test",
            "birthdate":"2018-08-28T15:26:32.612Z",
            "plan":"dummy_plan",
        }
    
        expect(()=>{lifeInsuranceParamsModel.validate(lifeInsuranceParams)}).not.toThrowError();
    
      });
}); 