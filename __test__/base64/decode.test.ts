import { base64 } from '../../src/index';

const { decode } = base64;

describe('base64 encode', () => {
    test('should return base64 when invoke encode params is test', () => {
        expect(decode('dGVzdA==')).toBe('test');
    });

    test('should return base64 when invoke params is undefined', () => {
        expect(decode()).toEqual('');
    });
});
