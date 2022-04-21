import { error as err } from '../../src/index';

const { TppInvokeError, TppResultError, IndustryError } = err;

describe('TppInvokeError', () => {
    it('should be defined', () => {
        expect(TppInvokeError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const data = {
            params: 'abc',
            tppUrl: 'tpp-url',
        };
        const error = new TppInvokeError('Tpp Invoke Error', {
            data,
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(TppInvokeError.name);
        expect(error.message).toContain('Tpp Invoke Error');
        expect(error.message).toContain(JSON.stringify(data));
    });
});

describe('TppResultError', () => {
    it('should be defined', () => {
        expect(TppInvokeError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const data = {
            params: 'abc',
            tppUrl: 'tpp-url',
            result: {
                data: 123,
            },
        };
        const error = new TppResultError('Tpp Result Error', {
            data,
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(TppResultError.name);
        expect(error.message).toContain('Tpp Result Error');
        expect(error.message).toContain(JSON.stringify(data));
    });
});
