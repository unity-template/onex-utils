import { RgbColor } from './hex2Rgb';

interface ColorType {
  /**
   * rgb three primary colors
   */
  rgb: RgbColor;
  /**
   * RGB value of character type
   */
  rgbColor: string;
  /**
   * RGBA value of character type (opacity)
   */
  rgbaColor: string;
  /**
   * Hexadecimal color
   */
  intHex: number;
  /**
   * The color of the hexadecimal number in the web
   */
  stringHex: string;
}

/**
 * 将RGB类型的颜色转化成各种形式进行使用
 *
 * @param color - {@link RgbColor} 需要转化的颜色
 * @param opacity - 透明度，值在0-1之间
 *
 * @example
 * ```ts
 * import { color } from 'onex-utils';
 * const colorType = color.format([255, 255, 255]);
 *
 * assets(colorType).toEqual({
 *   rgb: [255, 255, 255],
 *   rgbColor: 'rgb(255, 255, 255)',
 *   rgbaColor: 'rgba(255, 255, 255, 1)',
 *   intHex: 0xffffff,
 *   stringHex: '#ffffff',
 * });
 * ```
 *
 * @returns 对应的所有颜色类型{@link ColorType}
 */
export const format = (color: RgbColor, opacity?: number): ColorType => {
  const [rColor, gColor, bColor] = color;
  const getSingleHexColor = (singleColor: number) => {
    const hexColor = `0${singleColor.toString(16)}`.slice(-2);
    return hexColor;
  };
  return {
    rgb: color,
    rgbColor: `rgb(${rColor}, ${gColor}, ${bColor})`,
    rgbaColor: `rgba(${rColor}, ${gColor}, ${bColor}, ${opacity ?? 1})`,
    intHex: parseInt(
      `0x${getSingleHexColor(rColor)}${getSingleHexColor(
        gColor,
      )}${getSingleHexColor(bColor)}`,
      16,
    ),
    stringHex: `#${getSingleHexColor(rColor)}${getSingleHexColor(
      gColor,
    )}${getSingleHexColor(bColor)}`,
  };
};
