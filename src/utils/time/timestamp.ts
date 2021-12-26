export enum TimeStampType {
  /**
   * 精确到秒 （长度为10位）
   */
  second,
  /**
   * 精确到毫秒 （长度为13位）
   */
  millisecond,
}

/**
 * 获取时间戳
 *
 * @param type - 时间戳类型
 *
 * @example 获取13位时间戳
 * ``` ts
 * import { time } from 'onex-utils;
 *
 * const { getTimeStamp, TimeStampType } = time;
 * console.log(getTimeStamp(TimeStampType.second)); // 获取精确到秒的 10位时间戳
 * console.log(getTimeStamp(TimeStampType.millisecond)); // 获取精确到毫秒的 13位时间戳
 * ```
 */
export function getTimeStamp(type: TimeStampType = TimeStampType.millisecond) {
    const timeStamp = new Date().valueOf();
    if (type === TimeStampType.second) {
        return Math.round(timeStamp / 1000);
    }
    return timeStamp;
}
