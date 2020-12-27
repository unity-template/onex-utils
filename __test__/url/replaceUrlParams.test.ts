import { url } from '../../src';

const { replaceUrlParams } = url;

let windowSpy: jest.SpyInstance<Location>;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'location', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('replaceUrlParams', () => {
  test('should return prefix url', () => {
    windowSpy.mockImplementation(() => Object.assign({} as any, {
      search: '?q=antd&ie=UTF-8',
      href: 'https://www.taobao.com?q=antd&ie=UTF-8',
    }));
    const newParams = { q: 'test' };
    expect(replaceUrlParams(newParams)).toEqual('https://www.taobao.com?q=test&ie=UTF-8');
  });

  test('should add new Params when url not have the params', () => {
    windowSpy.mockImplementation(() => Object.assign({} as any, {
      search: '?q=antd&ie=UTF-8',
      href: 'https://www.taobao.com?q=antd&ie=UTF-8',
    }));
    const newParams = { test: 'new' };
    expect(replaceUrlParams(newParams)).toEqual('https://www.taobao.com?q=antd&ie=UTF-8&test=new');
  });
});
