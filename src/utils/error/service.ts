import { ErrorOptions, IndustryError } from './IndustryError';

interface ServiceInvokeErrorOptions extends ErrorOptions {
  data: {
    service?: string; // 服务名称或地址
    params?: any; // 调用入场
    response?: any; // 返回结果
  };
}

/**
 * Node FaaS 服务调用异常
 *
 * @example 创建异常
 * ```ts
 * const error = new ServiceInvokeError('XXX服务调用失败', {
 *   data: {
 *     service: 'aldComplete', // 服务名称
 *     params: { itemIds: [123, 456] }, // 调用入参
 *     response, // 返回结果
 *   },
 *   cause, // 原始异常
 * });
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns ServiceInvokeError instance
 */
export class ServiceInvokeError extends IndustryError {
  static description = 'Service调用异常';
  constructor(message?: string, options?: ServiceInvokeErrorOptions) {
      super(message || ServiceInvokeError.description, options);
      this.name = ServiceInvokeError.name;
  }
}
