/**
 * 将当前的localStorage全部进行清楚
 *
 * @remarks
 * 清除当前localStorage中某一个key值
 * 如果不传递key值，默认清空所有值
 *
 * @param name - 需要清除的key值名称
 *
 */
export function clean(name?: string) {
  if (!window?.localStorage?.clear) return false;
  if (!window?.localStorage?.removeItem) return false;
  if (name) {
    window.localStorage.removeItem(name);
    return true;
  }
  window?.localStorage?.clear();
  return true;
}
