/**
 * 将当前的localStorage全部进行清楚
 *
 * @remarks
 * 清除当前localStorage
 *
 */
export function clean() {
  if (!window?.localStorage?.clear) return false;
  window?.localStorage?.clear();
  return true;
}
