import { color } from '../../src/index';

const { transformHexColorToRgb } = color;

describe('transformHexColorToRgb', () => {
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
