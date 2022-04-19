import { error as err } from '../../src/index';

const { TairReadError, IndustryError } = err;

describe('TairReadError', () => {
    it('should be defined', () => {
        expect(TairReadError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const data = {
            keys: ['key1', 'key2'],
        };
        const error = new TairReadError('Tair Read Error', {
            data,
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(TairReadError.name);
        expect(error.message).toContain('Tair Read Error');
        expect(error.message).toContain(JSON.stringify(data));
    });
});
