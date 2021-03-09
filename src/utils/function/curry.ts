/**
 * 函数的柯里化
 *
 * @remarks
 * 柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，
 * 而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分
 * 计算函数。柯里化，是一个逐步接收参数的过程
 *
 * @remarks
 * 柯里化函数触发条件是传入参数长度为0
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
 * console.log(add1(5)()) // 6
 * console.log(add2(5)()) // 7
 * ```
 *
 * @param func - 需要柯里化的函数
 * @param preArgs - 柯里化参数
 * @returns 柯里化之后的函数
 */
export function curry(func, ...preArgs) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const ISelf = this;
  let allArgs = preArgs || [];

  return function (...args) {
    allArgs = [...allArgs, ...(args || [])];

    if ((args || []).length) {
      return curry.apply(ISelf, [func, ...allArgs]);
    } else {
      return func.apply(ISelf, allArgs);
    }
  };
}

/**
 * 反柯里化
 *
 * @remarks
 * 创建一个应用范围更广的函数。使得本来只有特定对象才适用的方法，扩展到更多的对象。
 *
 * @example 基本使用方式
 * ```typescript
 * import { func } from 'onex-utils';
 *
 * const { curry } = func;
 *
 * const testArr = [];
 * func.unCurry(Array.prototype.push)(testArr, 1, 2);
 * // testArr = [1, 2]
 * ```
 */
export function unCurry(func) {
  return function (that, ...args) {
    return func.apply(that, args);
  };
}

/**
 * 函数的柯里化（先接受右边参数）
 *
 * @remarks
 * 柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，
 * 而是返回一个接受剩余参数的函数。因为这样的特性，也被称为部分
 * 计算函数。柯里化，是一个逐步接收参数的过程
 *
 * @remarks
 * 柯里化函数触发条件是传入参数长度为0
 *
 * @example 基本使用
 * ```typescript
 * import { func } from 'onex-utils';
 *
 * const { curryRight } = func;
 * const add = curryRight((a: number, b: number) => [a,b]);
 *
 * const add1 = add(1);
 * const add2 = add(2);
 *
 * console.log(add1(5)()) // [5, 1]
 * console.log(add2(5)()) // [5, 2]
 * ```
 *
 * @param func - 需要柯里化的函数
 * @param afterPreArgs - 柯里化参数
 * @returns 柯里化之后的函数
 */
export function curryRight(func, ...afterPreArgs) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const ISelf = this;
  let allArgs = afterPreArgs || [];

  return function (...args) {
    allArgs = [...(args || []), ...allArgs];

    if ((args || []).length) {
      return curryRight.apply(ISelf, [func, ...allArgs]);
    } else {
      return func.apply(ISelf, allArgs);
    }
  };
}
