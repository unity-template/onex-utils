/**
 *
 * @remarks
 * 删除localStorage中的单个item
 *
 */
export function removeItem(name: string) {
  window?.localStorage?.removeItem(name);
}
