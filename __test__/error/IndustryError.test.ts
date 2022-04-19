import { error as err } from '../../src/index';

const { IndustryError } = err;

describe('IndustryError', () => {
    it('should be defined', () => {
        expect(IndustryError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new Error('cause');
        const error = new IndustryError('Custom Message', {
            data: 'abcd',
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(IndustryError.name);
        expect(error.message).toContain('Custom Message');
        expect(error.message).toContain('abcd');
    });
    it('cause chain should work', () => {
        const error1 = new IndustryError('Error1');
        const error2 = new IndustryError('Error2', { cause: error1 });
        const error3 = new IndustryError('Error3', { cause: error2 });
        expect(error1.cause).toEqual(undefined);
        expect(error2.cause).toEqual(error1);
        expect(error3.cause).toEqual(error2);
    });
});
