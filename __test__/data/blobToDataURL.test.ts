import { data } from '../../src/index';

const { blobToDataURL } = data;

describe('blobToDataURL', () => {
  test('should return that Blob or File', () => {
    const debug = {
      hello: 'world',
    };
    const blob = new Blob([JSON.stringify(debug, null, 2)], {
      type: 'application/json',
    });
    expect(blobToDataURL(blob)).resolves.toEqual('data:application/json;base64,ewogICJoZWxsbyI6ICJ3b3JsZCIKfQ==');
  });
});
