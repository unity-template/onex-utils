import { ErrorOptions, IndustryError } from './IndustryError';

/**
 * Node FaaS 阿拉丁补全失败
 *
 * @example 创建异常
 * ```ts
 * const error = new AldCompleteError('Ald Complete Error', {
 *   data: {
 *     // 调用补全的参数可以写在这里，辅助排查问题
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns AldCompleteError instance
 */
export class AldCompleteError extends IndustryError {
  static description = '阿拉丁补全失败';
  constructor(message?: string, options?: ErrorOptions) {
      super(message || AldCompleteError.description, options);
      this.name = AldCompleteError.name;
  }
}
