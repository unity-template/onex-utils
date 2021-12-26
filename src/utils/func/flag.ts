/* eslint-disable no-bitwise */

/**
 * flag.ts
 *
 * @remarks
 * 使用2的n次幂作为flag的标识，可以快速、高效的进行remove、hasALLFlag
 * hasAnyFlag等判断操作
 *
 * @example typescript中针对SymbolFlags的标识
 * ```typescript
 * export enum SymbolFlags {
 *      None = 0,
 *      FunctionScopedVariable = 1,
 *      BlockScopedVariable = 2,
 *      Property = 4,
 *      EnumMember = 8,
 *      Function = 16,
 *      Class = 32,
 *      Interface = 64,
 *      ConstEnum = 128,
 *      RegularEnum = 256,
 *      ValueModule = 512,
 *      NamespaceModule = 1024,
 *      TypeLiteral = 2048,
 *      ObjectLiteral = 4096,
 *      Method = 8192,
 *      Constructor = 16384,
 *      GetAccessor = 32768,
 *      SetAccessor = 65536,
 * };
 * ```
 */

/**
 * 将一组 flags 进行拆分
 *
 * @example 基本用法
 * ```typescript
 * import { func } from 'onex-utils';
 * import ts from 'typescript';
 *
 * const result = func.getEnumFlags(ts.SymbolFlags.Enum | ts.SymbolFlags.Alias);
 * // result = [ts.SymbolFlags.Enum, ts.SymbolFlags.Alias];
 * ```
 *
 * @param flags - flags 集合
 * @returns 枚举 flags 集合
 */
export function getEnumFlags<T extends number>(flags: T): T[] {
    const result: T[] = [];
    for (let i = 1; i <= flags; i *= 2) {
        if (flags & i) {
            result.push(i as T);
        }
    }
    return result;
}

/**
 * 移除flags的某个flag
 *
 * @example 基本用法
 * ```typescript
 * import { func } from 'onex-utils';
 * import ts from 'typescript';
 *
 * const result = func.removeFlag(ts.SymbolFlags.Enum | ts.SymbolFlags.Alias, ts.SymbolFlags.Alias);
 * // result = ts.SymbolFlags.Enum;
 * ```
 * @param flag - 集合的flags
 * @param remove - 需要remote
 * @returns 移除指定remove之后的flag
 */
export function removeFlag<T extends number>(flag: T, remove: T & {}): T {
    return ((flag ^ remove) & flag) as T;
}

/**
 * 判断flags中是包含全部某些特定的flags
 *
 * @example 基本用法
 * ```typescript
 * import { func } from 'onex-utils';
 * import ts from 'typescript';
 *
 * const result = func.hasAllFlags(ts.SymbolFlags.Enum | ts.SymbolFlags.Alias, ts.SymbolFlags.Alias);
 * // result = true;
 * ```
 *
 * @param flags - 集合的flags
 * @param check - 需要判断是否有无的flags
 * @returns 是否包含所有的
 */
export function hasAllFlags(flags: number, check: number): boolean {
    return (flags & check) === check;
}

/**
 * 判断flags中是包含任意指定的flags
 *
 * @example 基本用法
 * ```typescript
 * import { func } from 'onex-utils';
 * import ts from 'typescript';
 *
 * const result = func.hasAnyFlag(ts.SymbolFlags.Enum | ts.SymbolFlags.Alias, ts.SymbolFlags.Alias);
 * // result = true;
 * ```
 *
 * @param flags - 集合的flags
 * @param check - 需要判断是否有无的flags
 * @returns 是否包含任意一个
 */
export function hasAnyFlag(flags: number, check: number): boolean {
    return (flags & check) !== 0;
}
