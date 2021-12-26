import { color } from '../../src/index';

const { transformHexColorToRgb } = color;

describe('color transformHexColorToRgb', () => {
    test('should return rgb color when params is int hex Color', () => {
        const testColor = 0x666666;
        expect(transformHexColorToRgb(testColor)).toEqual([102, 102, 102]);
    });

    test('should return rgb color when params is string color len = 3', () => {
        const testColor = '#fff';
        expect(transformHexColorToRgb(testColor)).toEqual([255, 255, 255]);
    });

    test('should return rgb color when params is string color len = 6', () => {
        const testColor = '#eeeee1';
        expect(transformHexColorToRgb(testColor)).toEqual([238, 238, 225]);
    });
});

describe('color format', () => {
    test('should return all color type', () => {
        const result = color.format([255, 255, 255]);
        expect(result).toEqual({
            rgb: [255, 255, 255],
            rgbColor: 'rgb(255, 255, 255)',
            rgbaColor: 'rgba(255, 255, 255, 1)',
            intHex: 0xffffff,
            stringHex: '#ffffff',
        });
    });
});

describe('color random', () => {
    test('should return random rgb', () => {
        const result = color.random();
        expect(result.length).toEqual(3);
    });
});
