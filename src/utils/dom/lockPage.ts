/**
 * lock page
 *
 * @remarks
 * 锁住当前页面，不让其在Y轴滚动
 */
export const pageLock = () => {
    if (!document) return;
    const container = document.getElementById('recyclerview');
    if (container?.style) {
        container.style.height = '100%';
        container.style.overflow = 'hidden';
    } else {
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
    }
};
