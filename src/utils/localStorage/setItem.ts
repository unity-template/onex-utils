/**
 * @remarks
 * localStorage中存储单个item
 *
 */
export function setItem(name: string, value: string) {
  window?.localStorage?.setItem(name, value);
}
