/**
 * @jest-environment node
*/
import { url } from '../../src/index';

const { type } = url;

describe('url.type', () => {
  test('should return url self', () => {
    const urlType = type('https://github.com/');
    expect(urlType.url).toEqual('https://github.com/');
  });

  test('should return the url response content type', async () => {
    const urlType = type('https://gw.alicdn.com/tfs/TB15tJ5nggP7K4jSZFqXXamhVXa-500-500.jpg');
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


  test('should return this url response is img', async () => {
    const urlType = type('https://www.baidu.com/img/flexible/logo/pc/result.png');
    const isImage = await urlType.isImage();
    expect(isImage).toBeTruthy();
  });


  test('should return this url response is js', async () => {
    const urlType = type('https://code.jquery.com/jquery-3.6.0.min.js');
    const isJs = await urlType.isJs();
    expect(isJs).toBe(true);
  });

  test('should return this url response is css', async () => {
    const urlType = type('https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css');
    const isCss = await urlType.isCss();
    expect(isCss).toBe(true);
  });
});
