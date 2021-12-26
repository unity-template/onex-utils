/**
 * 判断接口返回的是否为true
 *
 * @remarks
 * 阿里mtop接口请求，针对boolean进行判断，其他业务禁用
 *
 * @example value is `true`
 * ```ts
 * import { type } from 'onex-utils';
 * const isTrue = type.isTrue('true');
 * console.log(isTrue); // true
 * ```
 *
 * @example value is `false`
 * ```ts
 * import { type } from 'onex-utils';
 * const isTrue = type.isTrue('false');
 * console.log(isTrue); // false
 * ```
 *
 * @example value is 0
 * ```ts
 * import { type } from 'onex-utils';
 * const isTrue = type.isTrue(0);
 * console.log(isTrue); // false
 * ```
 *
 * @deprecated 只适合阿里MTOP接口请求业务场景，其他业务场景勿使用
 */
export function isTrue(value: string | boolean | null | undefined) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return !!value;
}
