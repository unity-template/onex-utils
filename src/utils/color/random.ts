import { RgbColor } from './hex2Rgb';

/**
 * 随机生成一个颜色
 *
 * @example
 * ```ts
 * import { color } from 'onex-utils';
 * const randomColor = color.random(); // [122, 23, 89]
 * ```
 * @returns color rgb {@link RgbColor}
 */
export function random(): RgbColor {
  const randomSingleColor = () => Math.round(Math.random() * 255);
  return [randomSingleColor(), randomSingleColor(), randomSingleColor()];
}
