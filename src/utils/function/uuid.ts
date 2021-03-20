import { v4 as uuidV4 } from 'uuid';

interface GenUUID {
  (): string;
}

/**
 * 生成统一唯一标识符
 *
 * @remarks 统一唯一标识符计算说明
 * 通用唯一标识符 ( Universally Unique Identifier )，对于所有的UUID它可以保证在空间和时间上的唯一性，
 * 也称为GUID，全称为：Universally Unique IDentifier ，它是通过MAC地址，时间戳，命名空间，随机数，伪
 * 随机数来保证生成ID的唯一性。有着固定的大小( 128 bit位 )，通常由 32 字节的字符串（十六进制）表示。这里
 * 借助开源{@link https://github.com/uuidjs/uuid | uuid}实现uuid的生成
 *
 * @see {@link https://github.com/uuidjs/uuid | uuid} for more information
 *
 * @example 基本使用
 * ```ts
 * import { func } from 'onex-utils';
 *
 * console.log(func.uuid()) // 生成一个唯一标识符
 * ```
 */
export const uuid: GenUUID = () => {
  return uuidV4();
};
