import chunk from 'lodash.chunk';

export type RgbColor = number[];

function getIntHexColor(color: string): number {
  let IColor = color.replace('#', '');

  if (IColor.length === 3) {
    IColor = IColor.replace(/([\da-f])/gi, '$1$1');
  }

  if (IColor.length === 6) {
    return parseInt(IColor, 16);
  }

  throw new Error(`${color} -> ${IColor} 是个非法颜色`);
}

/**
 * 将int 或者 string 类型的颜色转化成 RGB数组形式
 *
 * @remarks
 * 如果想要其他形式颜色，可调用`color.format`进行格式转化
 *
 * @param hexColor - string | int类型的颜色，例如 ‘#FFF’、0xeeeeee
 *
 * @example string 类型传入
 * ```ts
 * import { color } from 'onex-utils';
 * const {transformHexColorToRgb} = color;
 * transformHexColorToRgb('#fff'); // [255, 255, 255]
 * ```
 *
 * @example int 类型传入
 * ```ts
 * import { color } from 'onex-utils';
 * const {transformHexColorToRgb} = color;
 * transformHexColorToRgb(0xffffff); // [255, 255, 255]
 * ```
 *
 * @returns rgb {@link RgbColor}
 */
export function transformHexColorToRgb(hexColor: number | string): RgbColor {
  const IColor =
    typeof hexColor === 'string' ? getIntHexColor(hexColor) : hexColor;
  const IColorString = IColor.toString(16);
  return chunk(IColorString.split(''), 2)
    .map((singleColor) => singleColor.join(''))
    .map((singleColor) => parseInt(singleColor, 16));
}
