/**
 * 将文本数据放置在剪贴板上
 *
 * @example 示例
 * ```ts
 * import { data } from 'onex-utils';
 * data.setClipboardData('bizCode: 6237893842');
 * ```
 */
export const setClipboardData = (value: string) => {
    const aux = document.createElement('input');
    aux.setAttribute('value', value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
};
