import { ErrorOptions, IndustryError } from './IndustryError';

interface TppErrorOptions extends ErrorOptions {
  data: {
    params: any; // tpp params
    tppUrl?: string; // tpp url
    response?: any; // 返回结果
  };
}

/**
 * Node FaaS Tpp 调用失败
 *
 * @example 创建异常
 * ```ts
 * const error = new TppInvokeError('Tpp调用失败', {
 *   data: {
 *     params: tppParams, // tpp 入参
 *     tppUrl, // tpp 地址
 *     response, // 返回结果
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns TppInvokeError instance
 */
export class TppInvokeError extends IndustryError {
  static description = 'TPP调用失败';
  constructor(message?: string, options?: TppErrorOptions) {
      super(
          message || TppInvokeError.description,
          options,
      );
      this.name = TppInvokeError.name;
  }
}

/**
 * Node FaaS Tpp 结果解析失败
 *
 * @example 创建异常
 * ```ts
 * const error = new TppResultError('Tpp调用失败', {
 *   data: {
 *     params: tppParams, // tpp 入参
 *     tppUrl, // tpp 地址
 *     response, // 返回结果
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns TppResultError instance
 */
export class TppResultError extends IndustryError {
  static description = 'TPP返回结果异常';
  constructor(message?: string, options?: TppErrorOptions) {
      super(
          message || TppResultError.description,
          options,
      );
      this.name = TppResultError.name;
  }
}
