import { error as err } from '../../src/index';

const { ServiceInvokeError, IndustryError } = err;

describe('ServiceInvokeError', () => {
    it('should be defined', () => {
        expect(ServiceInvokeError).toBeDefined();
    });
    it('instance properties should be correct', () => {
        const cause = new IndustryError('cause');
        const data = {
            service: 'ItemComplete',
            params: 'abcd',
            response: 'null',
        };
        const error = new ServiceInvokeError('Service Invoke Error', {
            data,
            cause,
        });
        expect(error).toBeDefined();
        expect(error.cause).toEqual(cause);
        expect(error.name).toEqual(ServiceInvokeError.name);
        expect(error.message).toContain('Service Invoke Error');
        expect(error.message).toContain(JSON.stringify(data));
    });
});
