import { getUrlHash } from './getUrlHash';
/**
 * 设置url上对应的hash参数
 *
 * @remarks
 * 当不传入`key`值，默认代表删除当前`param`
 *
 * @example 传入`key`、`value`值
 * ```ts
 * import { url } from 'onex-utils';
 * const { setUrlHash } = url;
 * console.log(setUrlHash('bizCode', '0234234'));
 * ```
 *
 * @example 传入`key`值，不传入`value`默认删除对应key值
 * ```ts
 * import { url } from 'onex-utils';
 * const { setUrlHash } = url;
 * console.log(setUrlHash('bizCode'));
 * ```
 */
export const setUrlHash = (key: string, value?: string) => {
    const params = getUrlHash();
    if (value) {
        params[key] = value;
    } else if (params?.[key] && !value) {
        delete params[key];
    }
    if (params) {
        window.location.hash = Object.keys(params)
            .map((paramKey) => {
                return `${key}=${encodeURIComponent(params[paramKey])}`;
            })
            .join('&');
    }
};
