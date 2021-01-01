/**
 * 获取localStorage中的数据
 *
 * @remarks
 * 获取localStorage中的数据
 */
export function getItem(name: string) {
  return window?.localStorage?.getItem(name);
}
