/**
 * @jest-environment jsdom
 */

import { url } from '../../src/index';

const { getUrlParam } = url;

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('getUrlParam', () => {
  test('should return name when url.query = ?q=antd&rlz=1C5CHFA_enUS907US908&oq=antd&aqs=chrome.0.69i59j35i39j0j69i60j69i65l3j69i60.5789j0j4&sourceid=chrome&ie=UTF-8', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        search: '?q=antd&rlz=1C5CHFA_enUS907US908&oq=antd&aqs=chrome.0.69i59j35i39j0j69i60j69i65l3j69i60.5789j0j4&sourceid=chrome&ie=UTF-8',
      },
    }));
    expect(getUrlParam('q')).toBe('antd');
  });
});
