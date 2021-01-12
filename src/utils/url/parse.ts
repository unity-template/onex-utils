import qs from 'qs';

/**
 * parse the url
 *
 * @example decodeURIComponent value
 * ```ts
 * import { url } from 'onex-utils';
 * const { parse } = url;
 * assert.deepEqual(parse('a%5Bb%5D=c'), {
 *     a: { b: 'c' }
 * });
 * ```
 *
 * @example normal
 * ```ts
 * import { url } from 'onex-utils';
 * const { parse } = url;
 * assert.deepEqual(parse('a%5Bb%5D=c'), {
 *     a: { b: 'c' }
 * });
 * ```
 * @example window.location.search = '?a[b]=c'
 * ```ts
 * import { url } from 'onex-utils';
 * const { parse } = url;
 * assert.deepEqual(parse(window.location.search, {ignoreQueryPrefix: true}), {
 *     a: { b: 'c' }
 * });
 * ```
 *
 * @remarks
 * 借用qs对应的方法，文档见：{@link https://github.com/ljharb/qs#parsing-objects|parsing-objects}
 *
 */
export const parseUrl = qs.parse;
