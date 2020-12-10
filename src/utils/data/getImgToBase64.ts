/**
 * 将图片的 url 转为 base64 格式
 */
export const getImgToBase64 = (url: string): Promise<string> => {
  return new Promise((success, fail) => {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpg');
      success(dataURL);
      canvas = null;
    };
    img.onerror = (err) => fail(err);
    img.src = url;
  });
};
