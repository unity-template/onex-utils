import { url } from '../../src/index';

const { getUrlParam } = url;

let windowSpy: jest.SpyInstance;

beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
    windowSpy.mockRestore();
});

describe('getUrlParam', () => {
    test('should return the value of the key ', () => {
        windowSpy.mockImplementation(() => ({
            location: {
                search: '?key=antd',
            },
        }));
        expect(getUrlParam('key')).toBe('antd');
    });

    test('should return first value when the url have the same params', () => {
        windowSpy.mockImplementation(() => ({
            location: {
                search: '?key=antd&key=test',
            },
        }));
        expect(getUrlParam('key')).toEqual('antd');
    });

    test('should return `null` when env is not in browser', () => {
        windowSpy.mockImplementation(() => (null));
        expect(getUrlParam('test')).toBeNull();
    });

    test('should return not decoded value of the key', () => {
        windowSpy.mockImplementation(() => ({
            location: {
                search: '?url=https%3A%2F%2Fgithub.com%2Fjef%2Fstreetmerchant%3Futm_source%3Dgold_browser_extension%3Fkey%3Dtest&key=value',
            },
        }));
        expect(getUrlParam('key')).toEqual('value');
    });
});
