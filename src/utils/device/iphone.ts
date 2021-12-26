/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-unused-expressions */

function isIos() {
    return /iphone/gi.test(window?.navigator?.userAgent);
}

/**
 * 判断当前机型是否是iphone异形屏幕
 *
 * @remarks
 * 只适用web场景下适用
 *
 * @remarks 目前已知的设变宽高
 * iPhone X,XS, 11 PRO = 375 x 812
 * iphone XS Max,XR, 11PRO MAx, 11 = 414 x 896
 * iphone 12 PRO MAX = 428 x 926
 * iphone 12, 12 PRO = 390 x 844
 * iphone 12 mini = 360 X 780
 *
 */
export function isIphoneXSeries() {
    if (!isIos()) {
        return false;
    }

    const width = window?.screen?.width ?? 0;
    const height = window?.screen?.height ?? 0;

    if (width && height) {
        return (
            (width === 360 && height === 780) ||
      (width === 375 && height === 812) ||
      (width === 414 && height === 896) ||
      (width === 390 && height === 844) ||
      (width === 428 && height === 926) ||
      (width === 360 && height === 780)
        );
    }

    return false;
}

/**
 * 获取顶部导航栏高度
 *
 * @remarks
 * 支持安卓和IOS
 */
export function getNavBarHeight() {
    if (isIos()) {
        return 80;
    }
    return 96;
}

/**
 * 获取屏幕顶部状态栏高度
 *
 * @remarks
 * 支持安卓和IOS
 */
export function getStatusBarHeight() {
    if (isIos()) {
        return isIphoneXSeries() ? 48 * 2 : 24 * 2;
    }
    return 0;
}

/**
 * 获取底部安全高度，单位PX
 *
 * @remarks
 * 支持安卓和IOS
 */
export function getBottomBarHeight() {
    if (!isIphoneXSeries()) {
        return 0;
    }
    return 68;
}
