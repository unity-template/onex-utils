/**
 * 函数的柯里化
 *
 * @example 基本使用
 * ```typescript
 * import { func } from 'onex-utils';
 *
 * const { curry } = func;
 * const add = curry((a: number, b: number) => a + b);
 *
 * const add1 = add(1);
 * const add2 = add(2);
 *
 * console.log(add1(5)) // 6
 * console.log(add2(5)) // 7
 * ```
 *
 * @param func - 需要柯里化的函数
 * @param preArgs - 柯里化参数
 * @returns 柯里化之后的函数
 */
export function curry(func, ...preArgs) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const ISelf = this;
  return function (...args) {
    return func.apply(ISelf, [].concat(preArgs, args));
  };
}

export const unCurry = () => {};

export const curryRight = () => {};
