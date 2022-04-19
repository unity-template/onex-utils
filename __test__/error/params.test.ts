import { error as err } from '../../src/index';

const { InvalidParamsError, IndustryError } = err;

describe('InvalidParamsError', () => {
    it('should be defined', () => {
        expect(IndustryError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const error = new InvalidParamsError('Invalid Params', {
            data: 'abcd',
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(InvalidParamsError.name);
        expect(error.message).toContain('Invalid Params');
        expect(error.message).toContain('abcd');
    });
});
