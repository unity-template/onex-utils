import { data } from '../../src/index';

const { dataURLtoBlob, blobToDataURL } = data;

describe('blobToDataURL', () => {
  test('should return that Blob or File', async () => {
    const debug = {
      hello: 'world',
    };
    const blob = new Blob([JSON.stringify(debug, null, 2)], {
      type: 'application/json',
    });
    const dataUrl = await blobToDataURL(blob) as string;
    expect(dataURLtoBlob(dataUrl)).toEqual(blob);
  });
});
