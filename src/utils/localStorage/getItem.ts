/**
 *
 * @remarks
 * 获取localStorage中的数据
 *
 */
export function getItem(name: string) {
  window?.localStorage?.getItem(name);
}
