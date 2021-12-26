import { base64 } from '../../src/index';

const { encode } = base64;

describe('base64 encode', () => {
    test('should return base64 when invoke encode params is test', () => {
        expect(encode('test')).toBe('dGVzdA==');
    });

    test('should return base64 when invoke params is undefined', () => {
        expect(encode()).toEqual('');
    });
});

