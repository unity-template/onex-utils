import qs from 'qs';

/**
 * stringify the url
 *
 * @example normal
 * ```ts
 * import { url } from 'onex-utils';
 * const {stringify} = url;
 * assert.equal(stringify({ a: 'b' }), 'a=b');
 * ```
 *
 * @example encode options
 * ```ts
 * import { url } from 'onex-utils';
 * const {stringify} = url;
 * const unencoded = stringify({ a: { b: 'c' } }, { encode: false });
 * assert.equal(unencoded, 'a[b]=c');
 * ```
 * @remarks
 * 引用qs库的方法，文档见：{@link https://github.com/ljharb/qs#stringifying | qs.stringifying}
 *
 */
export const { stringify } = qs;
