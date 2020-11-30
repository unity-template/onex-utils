/**
 *
 *
 * @description mtop接口请求返回值的判断
 * @param {(string | boolean)} value
 * @returns
 */
export function isTrue(value: string | boolean) {
  if (value === 'true') return true;
  return !!value;
}
