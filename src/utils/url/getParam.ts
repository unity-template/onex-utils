/**
 * Get the current value on the url
 *
 * @remarks
 * 如果存在两个同名的参数，默认取第一个参数
 *
 * @param key - The current url parameter name
 * @returns the current url parameter value with the key
 */
export const getUrlParam = (key: string): string | null => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
  if (!window?.location?.search) return null;
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};
