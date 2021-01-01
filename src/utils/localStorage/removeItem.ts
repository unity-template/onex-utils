/**
 * 清除localStorage中的item
 *
 * @remarks
 * 删除localStorage中的单个item
 *
 */
export function removeItem(name: string): boolean {
  if (!window?.localStorage?.removeItem) return false;
  window?.localStorage?.removeItem(name);
  return true;
}
