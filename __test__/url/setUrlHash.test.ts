import { url } from '../../src/index';

const { setUrlHash } = url;

let windowGetSpy: jest.SpyInstance<Window>;


describe('setUrlHash', () => {
    test('should set value', () => {
        setUrlHash('code', '1');
        expect(window.location.hash).toEqual('#code=1');
    });

    test('should not set hash value when hash params is null', () => {
        setUrlHash('code');
        expect(window.location.hash).toEqual('');
    });

    test('should reset hash value', () => {
        const originWindow: Window = { ...window };
        windowGetSpy = jest.spyOn(global, 'window', 'get');
        windowGetSpy.mockReturnValueOnce(({
            ...originWindow,
            location: {
                ...originWindow.location,
                hash: '#code=1',
            },
        }));

        setUrlHash('code', '2');
        windowGetSpy.mockClear();
        expect(window.location.hash).toEqual('#code=2');
    });

    test('should clean hash value', () => {
        const originWindow: Window = { ...window };
        windowGetSpy = jest.spyOn(global, 'window', 'get');
        windowGetSpy.mockReturnValueOnce(({
            ...originWindow,
            location: {
                ...originWindow.location,
                hash: '#code=1',
            },
        }));

        setUrlHash('code');
        windowGetSpy.mockClear();
        expect(window.location.hash).toEqual('');
    });
});
