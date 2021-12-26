/**
 * lock page
 *
 * @remarks
 * 解锁页面，当前在Y轴进行滚动
 */
export function unLockPage() {
    if (!document) return;
    const recyclerview = document.getElementById('recyclerview');
    if (recyclerview) {
        recyclerview.style.height = 'auto';
        recyclerview.style.overflow = 'auto';
    } else {
        document.body.style.height = 'auto';
        document.body.style.width = 'auto';
    }
}
