import ObjectHash from 'object-hash';
import { JsonValue } from 'type-fest';

/**
 * 针对对象生成hash
 *
 * @remarks
 * Generate hashes from objects and values in node and the browser.
 * Uses node.js crypto module for hashing. Supports SHA1 and many
 * others (depending on the platform) as well as custom streams (e.g. CRC32).
 *
 * @see {@link https://github.com/puleos/object-hash | object-hash} for more information
 *
 * @example 基本使用
 * ```ts
 * import { func } from 'onex-utils';
 *
 * console.log(func.hash({foo: 'bar'})) // => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
 * console.log(func.hash([1, 2, 2.718, 3.14159])) // => '136b9b88375971dff9f1af09d7356e3e04281951'
 * ```
 */
export const hash = (data: JsonValue): string => {
  return ObjectHash(data);
};
