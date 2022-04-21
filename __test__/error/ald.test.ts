import { error as err } from '../../src/index';

const { IndustryError, AldCompleteError } = err;

describe('AldCompleteError', () => {
    it('should be defined', () => {
        expect(AldCompleteError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const error = new AldCompleteError('Ald Complete Error', {
            data: 'abcd',
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(AldCompleteError.name);
        expect(error.message).toContain('Ald Complete Error');
        expect(error.message).toContain('abcd');
    });
    it('cause chain should work', () => {
        const error1 = new AldCompleteError('Error1');
        const error2 = new AldCompleteError('Error2', { cause: error1 });
        const error3 = new AldCompleteError('Error3', { cause: error2 });
        expect(error1.cause).toEqual(undefined);
        expect(error2.cause).toEqual(error1);
        expect(error3.cause).toEqual(error2);
    });
});
