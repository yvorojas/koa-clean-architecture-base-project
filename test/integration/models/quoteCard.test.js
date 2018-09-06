describe('quote card model test', () => {
    let quoteCardModel = require('../../../src/models/quoteCard');
  
    test('should fail if model is invalid', ()=>{
  
      const quoteCard = {
          message: 'INVALID_MODEL'
      };
  
      expect(()=>{quoteCardModel.validate(quoteCard)}).toThrowError();
  
    });

    test('should fail if model is invalid', ()=>{
  
        const quoteCard = {
            "id": "DUMMY_ID",
            "name": "DUMMY_NAME",
            "price": 100,
            "priceCLP": 200,
            "deductible": 2.1,
            "images": [
            "DUMMY_IMAGE1",
            "DUMMY_IMAGE2"
            ]
        }
    
        expect(()=>{quoteCardModel.validate(quoteCard)}).not.toThrowError();
    
      });
}); 