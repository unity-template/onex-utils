/* eslint-disable no-redeclare */

/**
 * 获取当前URL上hash参数
 *
 * @remarks
 * 如果URL Hash中存在两个同名的参数，默认返回第一个匹配的参数
 * 返回结果会使用`decodeURIComponent`进行解码
 *
 * @example 传入`currentKey`参数
 * ```ts
 * import { url } from 'onex-utils';
 * const { getUrlHash } = url;
 * console.log(getUrlHash('bizCode'));
 * ```
 *
 * @example 不传入`currentKey`参数
 * ```ts
 * import { url } from 'onex-utils';
 * const { getUrlHash } = url;
 * const hashParams = getUrlHash();
 * console.log(hashParams);
 * ```
 *
 */
export function getUrlHash(): { [key: string]: string } | {};
export function getUrlHash(currentKey: string): string | undefined;
export function getUrlHash(currentKey?: string) {
    const params: { [key: string]: string } = {};
    const IHashGroup = window.location.hash.substr(1).split('&');

    IHashGroup.forEach((param) => {
        const [key, value] = param.split('=');

        if (key) {
            const existingValue = params[key];
            if (!existingValue) {
                params[key] = decodeURIComponent(value);
            }
        }
    });

    return currentKey ? (params[currentKey] as string | undefined) : params;
}
