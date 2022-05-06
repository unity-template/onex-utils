export interface ErrorOptions {
  cause?: Error; // error cause
  data?: any; // any data
}

const formatMessage = (description?: string, options?: ErrorOptions) => {
    const { data, cause } = options || {};
    let message = description || IndustryError.description;
    if (data) {
        message += `, data: ${JSON.stringify(data)}`;
    }
    if (cause) {
        message += `, cause: ${cause.name}, ${cause.message}`;
    }
    return message;
};

/**
 * Node FaaS 通用异常
 *
 * @remarks
 * 不建议直接通过 `new IndustryError` 创建实例，建议使用更详细的 `TppInvokeError` 和 `TairReadError` 等，如果没有找到合适的错误类型，可以从 `IndustryError` 继承自定义错误类型。
 *
 * @example 定义自己的错误类型
 * ```ts
 * export class MyError extends IndustryError {
 *   static description = 'xxx异常';
 *   constructor(message?: string, options?: ErrorOptions) {
 *     super(message || MyError.description, options);
 *     this.name = MyError.name;
 *   }
 * }
 * ```
 * @param message - 异常描述，字符串
 * @param options - 异常附加信息
 * @returns IndustryError instance
 */
export class IndustryError extends Error {
  static description = '行业通用异常';
  cause: Error | undefined = undefined;
  constructor(message?: string, options?: ErrorOptions) {
      super(formatMessage(message || IndustryError.description, options));
      this.name = IndustryError.name;
      const cause = options?.cause;
      if (cause && !this.cause) {
          this.cause = cause;
      }
  }
}
