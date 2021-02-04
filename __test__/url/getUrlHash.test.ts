import { url } from '../../src/index';

let windowSpy: jest.SpyInstance;

const { getUrlHash } = url;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});


describe('getUrlHash', () => {
  test('should return url hash params when window.location.hash = ``', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hash: '',
      },
    }));
    expect(getUrlHash()).toEqual({});
  });

  test('should return url hash params when window.location.hash = #code=1', () => {
    expect.assertions(2);
    windowSpy.mockImplementation(() => ({
      location: {
        hash: '#code=1',
      },
    }));
    expect(getUrlHash('code')).toEqual('1');
    expect(getUrlHash()).toEqual({
      code: '1',
    });
  });

  test('should return url hash params when window.location.hash = #code=%E6%B5%8B%E8%AF%95', () => {
    expect.assertions(2);
    windowSpy.mockImplementation(() => ({
      location: {
        hash: '#code=%E6%B5%8B%E8%AF%95',
      },
    }));
    expect(getUrlHash()).toEqual({
      code: '测试',
    });
    expect(getUrlHash('code')).toEqual('测试');
  });

  test('should return url hash param when window.location.hash have the same name', () => {
    expect.assertions(2);
    windowSpy.mockImplementation(() => ({
      location: {
        hash: '#code=%E6%B5%8B%E8%AF%95&code=1&bizCode=1',
      },
    }));
    expect(getUrlHash('code')).toEqual('测试');
    expect(getUrlHash('bizCode')).toEqual('1');
  });
});
