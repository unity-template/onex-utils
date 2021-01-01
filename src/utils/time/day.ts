import dayjs from 'dayjs';

/**
 * 创建dayjs实例的工厂函数
 *
 * @remarks
 * 通过此函数创建dayjs.Dayjs实例
 * 支持传入字符串（字符串描述）、时间戳（10位、13位、unix类型）、Date对象
 *
 * @example string
 * ```ts
 * import { time } from 'onex-utils';
 * const t1 = time.createDayjs('2020-01-01')
 * ```
 *
 * @example number
 * ```ts
 * import { time } from 'onex-utils';
 * const t1 = time.createDayjs(1609518911614);
 * ```
 *
 * @example Date
 * ```ts
 * import { time } from 'onex-utils';
 * const currentTime = new Date();
 * const t1 = time.createDayjs(currentTime);
 * ```
 * @param currentTime - 实例化合法的dayjs实例
 * @returns dayjs instance
 */
export function createDayjs(
  time?: string | number | Date,
): dayjs.Dayjs | undefined {
  let dayjsInstance: dayjs.Dayjs;
  let currentTime: string | number | Date = time;

  if (!currentTime) {
    dayjsInstance = dayjs();
  }

  if (currentTime instanceof Date) {
    dayjsInstance = dayjs(currentTime);
  }

  currentTime += '';

  if (typeof currentTime === 'string') {
    // 时间戳13位
    if (/^\d{13}$/.test(currentTime)) {
      dayjsInstance = dayjs(parseInt(currentTime, 10));
    }

    // 时间戳10位
    if (/^\d{10}$/.test(currentTime)) {
      dayjsInstance = dayjs(parseInt(`${currentTime}000`, 10));
    }

    // 兼容unix类型时间戳
    if (/^\d{10}.\d+/.test(currentTime)) {
      dayjsInstance = dayjs.unix(Number(currentTime));
    }

    // 传入字符进行实例化
    if (/-|:|：/.test(currentTime)) {
      dayjsInstance = dayjs(currentTime);
    }
  }

  if (dayjsInstance && dayjsInstance.isValid()) {
    return dayjsInstance;
  }

  return undefined;
}
