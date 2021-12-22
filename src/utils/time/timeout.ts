/**
 * 调用超时处理函数
 *
 * @remarks 常用于调用一些不确定返回的函数，例如网络请求等等
 *
 * @example 函数调用超时（1）
 * ```ts
 * const test_func = () => new Promise((resolve, reject) => {
 *   console.log('调用，但是不执行resolve，等待超时···');
 * })
 *
 * timeout(test_func, 300).then(() => {
 *  console.log('函数执行成功');
 * }).catch(() => {
 *  console.log('函数执行超时')
 * })
 * // info：调用，但是不执行resolve，等待超时···
 * // info: 函数执行超时
 * ```
 *
 * @example 函数调用超时（2）
 * ```ts
 *
 * const test_func = () => new Promise((resolve, reject) => {
 *   setTimeout(() => {
 *     resolve('执行');
 *   }, 1000);
 * })
 *
 * timeout(test_func, 300).then(() => {
 *  console.log('函数执行成功');
 * }).catch(() => {
 *  console.log('函数执行超时')
 * })
 *
 * // info： 函数执行超时
 * ```
 * @param func - 可执行函数
 * @param timestamp - 等待时长（单位ms）
 * @returns  函数调用 ReturnType\<typeof func\> 结果
 */
export function timeout<P extends (...args: any[]) => Promise<any>>(
  func: P,
  timestamp: number) {
  return (...args: Parameters<P>) => {
    const timeout_promise = new Promise((_, reject) => {
      setTimeout(() => {
        /**
         * 不自定义类型是因为ES5中不支持
         */
        reject(new Error('function call timeout'));
      }, timestamp);
    });
    return Promise.race([timeout_promise, func(...args)]) as ReturnType<P>;
  };
}
