interface IntervalHandle {
    id: number;
}

/**
 * @remarks 更好性能的定时器，使用requestAnimationFrame实现 `setTimeout`，避免不必要的渲染。
 * API和 `setTimeout` 保持一致，旧代码理论上可以直接搜索替换。`setRAFInterval` 用来替代 `setTimeout`，`cancelRAFInterval` 用来替代 `clearInterval`
 * @example 使用方法
 * ```ts
 * // 每100毫秒执行一次
 * const id = setRAFInterval(() => console.log('call'), 100);
 * cancelRAFInterval(id);
 * ```
 * @param callback - 回调函数
 * @param delay - 调用间隔(ms)
 */
export const setRAFInterval = function (
    callback: () => void,
    delay = 0,
) {
    let start = new Date().getTime();
    const handle: IntervalHandle = {
        id: 0,
    };
    const loop = () => {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        const current = new Date().getTime();
        if (current - start > delay) {
            callback(); // 执行回调
            start = new Date().getTime();
        }
        handle.id = requestAnimationFrame(loop);
    };
    handle.id = requestAnimationFrame(loop);
    return handle;
};

/**
 * @remarks 取消定时器
 * @param handle - 定时器ID
 */
export const cancelRAFInterval = function (handle: IntervalHandle) {
    cancelAnimationFrame(handle.id);
};
