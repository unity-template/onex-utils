/**
 * localStorage 存储单个item
 *
 * @remarks
 * 设置localStorage中单个item
 *
 */
export function setItem(name: string, value: string): boolean {
  if (!window?.localStorage?.setItem) return false;
  window?.localStorage?.setItem(name, value);
  return true;
}
