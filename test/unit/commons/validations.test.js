describe('validations test', () => {
    
    beforeEach(() => {
        validations = require('../../../src/commons/validations');
    });

    test('should return false if input is null in mail validation', () => {
        const input = null;
        const result = validations.isMail(input);
        expect(result).toBe(false);
    });

    test('should return false if input is empty in mail validation', () => {
        const input = '';
        const result = validations.isMail(input);
        expect(result).toBe(false);
    });

    test('should return false if input is invalid mail in mail validation', () => {
        const input = 'invalid_value';
        const result = validations.isMail(input);
        expect(result).toBe(false);
    });

    test('should return true if input is valid mail in mail validation', () => {
        const input = 'valid@mail.com';
        const result = validations.isMail(input);
        expect(result).toBe(true);
    });

    test('should return false if input is null in date validation', () => {
        const input = null;
        const result = validations.isDate(input);
        expect(result).toBe(false);
    });

    test('should return false if input is empty in date validation', () => {
        const input = '';
        const result = validations.isDate(input);
        expect(result).toBe(false);
    });

    test('should return false if input is invalid date in date validation', () => {
        const input = 'invalid_value';
        const result = validations.isDate(input);
        expect(result).toBe(false);
    });

    test('should return true if input is valid date in date validation', () => {
        const input = '03-06-1988';
        const result = validations.isDate(input);
        expect(result).toBe(true);
    });

    test('should return false if input is null in rut validation', () => {
        const input = null;
        const result = validations.isRut(input);
        expect(result).toBe(false);
    });

    test('should return false if input is empty in rut validation', () => {
        const input = '';
        const result = validations.isRut(input);
        expect(result).toBe(false);
    });

    test('should return false if split applied in input with - as a separator, return length distinct of two elements in rut validation', () => {
        const input = 'split_value';
        const result = validations.isRut(input);
        expect(result).toBe(false);
    });

    test('should return false if run (first part of rut) is not numeric in rut validation', () => {
        const input = 'not_numeric_value-dv';
        const result = validations.isRut(input);
        expect(result).toBe(false);
    });

    test('should return false if calculatedv method returns distinct value of input dv in rut validation', () => {
        const input = '11111111-4';
        const result = validations.isRut(input);
        expect(result).toBe(false);
    });

    test('should return true if calculatedv method returns same value of input dv in rut validation', () => {
        const input = '11111111-1';
        const result = validations.isRut(input);
        expect(result).toBe(true);
    });

    test('should return 0 if 11 - rest of run is equal to 10 in calculateDv method', () => {
        const input = '14-0';
        const result = validations.isRut(input);
        expect(result).toBe(true);
    });

    test('should return k if 11 - rest of run is equal to 10 in calculateDv method', () => {
        const input = '23-k';
        const result = validations.isRut(input);
        expect(result).toBe(true);
    });

    test('should return false if input quote not brings a valid rut', () => {
        const input = {};
        validations.isRut = () => {
            return false;
        }
        const result = validations.isValidQuote(input);
        expect(result.isValid).toBe(false);
    });

    test('should return false if input quote not brings a valid date', () => {
        const input = {};
        validations.isDate = () => {
            return false;
        }
        const result = validations.isValidQuote(input);
        expect(result.isValid).toBe(false);
    });

    test('should return false if input quote not brings a valid mail', () => {
        const input = {};
        validations.isMail = () => {
            return false;
        }
        const result = validations.isValidQuote(input);
        expect(result.isValid).toBe(false);
    });

    test('should return true if input quote is valid', () => {
        const input = {
            email: 'valid@mail.com',
            rut: '11111111-1',
            birthDate: '01-01-2001',
        };
        const result = validations.isValidQuote(input);
        expect(result.isValid).toBe(true);
    });

});