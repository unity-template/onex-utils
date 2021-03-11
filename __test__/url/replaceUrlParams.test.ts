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

  test('should add new Params when assign url in options ', () => {
    windowSpy.mockImplementation(() => Object.assign({} as any, {
      search: '?q=antd&ie=UTF-8',
      href: 'https://www.taobao.com?q=antd&ie=UTF-8',
    }));

    const newParams = { test: 'new' };
    expect(replaceUrlParams(newParams, {
      url: 'https://www.baidu.com?q=antd&ie=UTF-8',
    })).toEqual('https://www.baidu.com?q=antd&ie=UTF-8&test=new');
  });

  test('should add new Params when url include hash params 1', () => {
    windowSpy.mockImplementation(() => Object.assign({} as any, {
      search: undefined,
      href: 'https://taobao.com/pribuy?node=1#/firstbuy/list',
    }));
    const newParams = { test: 'new' };
    expect(replaceUrlParams(newParams)).toEqual('https://taobao.com/pribuy?node=1&test=new#/firstbuy/list');
  });

  test('should add new params when url include hash params 2', () => {
    windowSpy.mockImplementation(() => Object.assign({} as any, {
      search: undefined,
      href: 'https://taobao.com/pribuy#/firstbuy/list?node=1',
    }));
    const newParams = { test: 'new' };
    expect(replaceUrlParams(newParams)).toEqual('https://taobao.com/pribuy?test=new#/firstbuy/list?node=1');
  });
});
