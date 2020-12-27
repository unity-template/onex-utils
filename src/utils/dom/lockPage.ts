/**
 * lock page
 *
 * @remarks
 * 锁住当前页面，不让其滚动
 */
export const pageLock = () => {
  if (!document) return;
  if (document.getElementById('recyclerview')) {
    document.getElementById('recyclerview').style.height = '100%';
    document.getElementById('recyclerview').style.overflow = 'hidden';
  } else {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  }
};
