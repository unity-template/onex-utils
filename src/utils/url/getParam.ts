/**
 * Get the current value on the url
 *
 * @remarks
 * 如果URL上跟了两个同名的参数，默认返回第一个匹配的参数
 * 返回结果会使用`decodeURIComponent`进行解码
 *
 * @example
 * ```ts
 * import { url } from 'onex-utils';
 * const { getUrlParams } = url;
 * console.log(getUrlParams('key'));
 * ```
 *
 * @param key - The current url parameter name
 * @returns the current url parameter value with the key
 */
export const getUrlParam = (key: string): string | null => {
  const currentSearchValue = window?.location?.search?.substr(1);
  if (!currentSearchValue) return null;

  const paramReg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
  const r = currentSearchValue.match(paramReg);
  return r ? decodeURIComponent(r[2]) : null;
};
