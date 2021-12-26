const getSystemUa = () => window?.navigator?.userAgent?.toLowerCase();

interface OsVersion {
  /**
   * 是否是IOS系统
   */
  isIos: boolean;
  /**
   * 是否是安卓系统
   */
  isAndroid: boolean;
  /**
   * 对应的版本
   */
  version: string;
}

/**
 * 获取客户端系统版本
 *
 * @remarks 只能判断手机客户端版本
 *
 * @example 简单实用
 * ```ts
 * import { device } from 'onex-utils';
 *
 * const osInfo = device.getOsVersion();
 * console.log(osInfo.isIos); // true
 * console.log(osInfo.isAndroid); // false
 * console.log(osInfo.version); // 12.0.2
 * ```
 */
export function getOsVersion(): OsVersion {
    const ios = isIos();
    const android = isAndroid();
    let version = 'unknown';

    if (ios) {
        version = getIosVersion() ?? version;
    }

    if (android) {
        version = getAndroidVersion() ?? version;
    }

    return {
        isIos: ios,
        isAndroid: android,
        version,
    };
}

/**
 * 获取安卓手机版本
 */
export function getAndroidVersion(
    ua: string = getSystemUa(),
): string | undefined {
    return ua.match(/android (.*?);/)?.[1];
}

/**
 * 获取IOS版本
 */
export function getIosVersion(ua: string = getSystemUa()): string | undefined {
    return ua.match(/cpu iphone os (.*?) like mac os/)?.[1]?.replace(/_/g, '.');
}

/**
 * 判断是否是：IOS系统
 */
export const isIos = (ua: string = getSystemUa()) => {
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) && !!ua.match(/iphone/i);
};

/**
 * 判断是否是：安卓系统
 */
export const isAndroid = (ua: string = getSystemUa()) => {
    return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
};
