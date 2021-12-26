import { data } from '../../src/index';

const { dataURLtoFile, blobToDataURL } = data;


describe('dataURLtoFile', () => {
    test('should return File', async () => {
        const debug = {
            hello: 'world',
        };
        const blob = new Blob([JSON.stringify(debug, null, 2)], {
            type: 'application/json',
        });
        const dataUrl = await blobToDataURL(blob) as string;
        const file = await dataURLtoFile(dataUrl, 'test');
        expect(file).toHaveProperty('name', 'test');
        expect(file).toHaveProperty('size', 22);
        expect(file).toHaveProperty('type', 'application/json');
    });
});
