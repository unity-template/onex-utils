import { ErrorOptions, IndustryError } from './IndustryError';

interface TairReadErrorOptions extends ErrorOptions {
  data: {
    keys?: string[]; // 读取的key
    response?: any; // 返回结果
  };
}

/**
 * Node FaaS Tair 读取异常
 *
 * @example 创建异常
 * ```ts
 * const error = new TairReadError('tair读取失败', {
 *   data: {
 *     keys: ['item-123', 'item-456'], // key list
 *     response, // 返回结果
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns TairReadError instance
 */
export class TairReadError extends IndustryError {
  static description = 'Tair读取异常';
  constructor(message?: string, options?: TairReadErrorOptions) {
      super(message || TairReadError.description, options);
      this.name = TairReadError.name;
  }
}
