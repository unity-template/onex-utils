import { device } from '../../src/index';

let windowSpy: jest.SpyInstance;

const { isIos, isAndroid, getOsVersion, getAndroidVersion, getIosVersion } = device;

beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
    windowSpy.mockRestore();
});


describe('test device utils version isIos os isAndroid', () => {
    test('should return true when ua is iphoneX', () => {
        expect.assertions(5);
        windowSpy.mockImplementation(() => ({
            navigator: {
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            },
        }));
        expect(isAndroid()).toBeFalsy();
        expect(isIos()).toBeTruthy();
        expect(getIosVersion()).toBe('13.2.3');
        expect(getAndroidVersion()).toBe(undefined);
        expect(getOsVersion()).toEqual({
            isIos: true,
            isAndroid: false,
            version: '13.2.3',
        });
    });

    test('should return false when ua is android', () => {
        expect.assertions(5);
        windowSpy.mockImplementation(() => ({
            navigator: {
                userAgent: 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Mobile Safari/537.36',
            },
        }));
        expect(isAndroid()).toBeTruthy();
        expect(isIos()).toBeFalsy();
        expect(getIosVersion()).toBe(undefined);
        expect(getAndroidVersion()).toBe('8.0.0');
        expect(getOsVersion()).toEqual({
            isIos: false,
            isAndroid: true,
            version: '8.0.0',
        });
    });

    test('should return false when ua is iPad', () => {
        expect.assertions(5);
        windowSpy.mockImplementation(() => ({
            navigator: {
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
            },
        }));
        expect(isAndroid()).toBeFalsy();
        expect(isIos()).toBeFalsy();
        expect(getIosVersion()).toBe(undefined);
        expect(getAndroidVersion()).toBe(undefined);
        expect(getOsVersion()).toEqual({
            isIos: false,
            isAndroid: false,
            version: 'unknown',
        });
    });
});
