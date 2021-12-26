import { isIos } from './version';

/**
 * 获取当前设备的宽度，单位PX
 *
 * @remarks
 * 常用与移动端开发中单位的计算
 *
 * @example px2rpx
 * ```ts
 * import { device } from 'onex-utils';
 * const { getDeviceWidth } = device;
 * export function px2rpx(source, width: number) {
 *   const scale = 750 / width;
 *   return `${getDeviceWidth() * scale}rpx`;
 * }
 * ```
 *
 * @example rpx2px
 * ```ts
 * import { device } from 'onex-utils';
 * const { getDeviceWidth } = device;
 * export function rpx2px(source, width: number) {
 *   const scale = 750 / width;
 *   return `${getDeviceWidth() / scale}px`;
 * }
 * ```
 */
export function getDeviceWidth() {
    if (isIos()) {
        return document.body.clientWidth;
    }
    return window.devicePixelRatio * window.screen.width;
}
