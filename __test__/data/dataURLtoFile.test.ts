/**
 * @jest-environment jsdom
 */

import { data } from '../../src/index';

const { dataURLtoFile, blobToDataURL } = data;


describe('dataURLtoFile', () => {
  test('should return File', async () => {
    expect.assertions(3);
    const debug = {
      hello: 'world',
    };
    const blob = new Blob([JSON.stringify(debug, null, 2)], {
      type: 'application/json',
    });
    const dataUrl = await blobToDataURL(blob) as string;
    const file = await dataURLtoFile(dataUrl, 'test');
    expect(file.name).toBe('test');
    expect(file.size).toEqual(22);
    expect(file.type).toEqual('application/json');
  });
});