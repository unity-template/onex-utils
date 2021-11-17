/**
 * 将图片的 dataURL 转为 Blob 格式
 */
export const dataURLtoBlob = (dataURL: string) => {
  const arr = dataURL.split(',');
  const mime = arr?.[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
