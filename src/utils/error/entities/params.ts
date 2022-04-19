import { ErrorOptions, IndustryError } from './IndustryError';

/**
 * Node FaaS 参数异常
 *
 * @example 创建异常
 * ```ts
 * const error = new InvalidParamsError('XXX参数错误', {
 *   data: {
 *     // 参数
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns InvalidParamsError instance
 */
export class InvalidParamsError extends IndustryError {
  static description = '非法入参';
  constructor(message?: string, options?: ErrorOptions) {
      super(message || InvalidParamsError.description, options);
      this.name = InvalidParamsError.name;
  }
}
