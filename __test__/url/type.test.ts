/**
 * @jest-environment jsdom
 */

import { url } from '../../src/index';

const { type } = url;

describe('url.type', () => {
  test('should return url self', () => {
    const urlType = type('https://github.com/');
    expect(urlType.url).toEqual('https://github.com/');
  });

  test('should return the url response content type', async () => {
    const urlType = type('https://avatars2.githubusercontent.com/u/46585516?s=40&u=c963a9d6b2260fe04fb0d5248825654a362bdbc8&v=4');
    const contentType = await urlType.contentType;
    expect(contentType).toEqual('image/jpeg');
  });

  test('should return the url response is png', async () => {
    const urlType = type('https://gw.alicdn.com/tfs/TB1jA_34kT2gK0jSZFkXXcIQFXa-132-132.png');
    const isPng = await urlType.isPng();
    expect(isPng).toBe(true);
  });

  test('should return this url response is gif', () => {
    const urlType = type('https://c.tenor.com/6dsQD0tZSuoAAAAj/milk-and-mocha-tantrums.gif');
    expect(urlType.isGif()).resolves.toEqual(true);
  });


  test('should return this url response is img', () => {
    const urlType = type('https://avatars2.githubusercontent.com/u/46585516?s=40&u=c963a9d6b2260fe04fb0d5248825654a362bdbc8&v=4');
    expect(urlType.isImage()).resolves.toBeTruthy();
  });


  test('should return this url response is js', () => {
    const urlType = type('https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js');
    expect(urlType.isJs()).resolves.toBe(true);
  });

  test('should return this url response is css', () => {
    const urlType = type('https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css');
    expect(urlType.isCss()).resolves.toBe(true);
  });
});
