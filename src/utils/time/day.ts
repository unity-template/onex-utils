import dayjs from 'dayjs';

/**
 *创建dayjs的工厂函数
 *
 * @remarks
 * 通过此函数创建dayjs.Dayjs对象，目前只支持字符串、时间戳、Date对象，
 * 目前不支持通过dayjs通过对象、数组创建实例
 *
 *
 * @param currentTime - 当前的时间
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
    // 序列帧 13位
    if (/^\d{13}$/.test(currentTime)) {
      dayjsInstance = dayjs(parseInt(currentTime, 10));
    }

    // 序列帧10位
    if (/^\d{10}$/.test(currentTime)) {
      dayjsInstance = dayjs(parseInt(`${currentTime}000`, 10));
    }

    // 兼容unix类型时间戳
    if (/^\d{10}.\d+/.test(currentTime)) {
      dayjsInstance = dayjs.unix(Number(currentTime));
    }

    // 针对字符串类型的数字
    if (/-|:|：/.test(currentTime)) {
      dayjsInstance = dayjs(currentTime);
    }
  }

  if (dayjsInstance && dayjsInstance.isValid()) {
    return dayjsInstance;
  }
  return undefined;
}
