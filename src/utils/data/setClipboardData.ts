/**
 * 将文本数据放置在剪贴板上
 * @param {String} value
 */
export const setClipboardData = (value) => {
  const aux = document.createElement('input');
  aux.setAttribute('value', value);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
};
