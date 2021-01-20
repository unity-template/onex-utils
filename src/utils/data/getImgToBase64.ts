export enum ImgType {
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  APNG = 'image/png',
  /**
   * 只有在chrome中支持
   */
  WEBP = 'image/webp',
  GIF = 'image/gif',
}

export interface ImgOptions {
  type: ImgType;
  quality: number;
}

/**
 * 将图片的 url 转为 base64 格式
 *
 * @example not options
 * ```ts
 * import { data } from 'onex-utils';
 * data.getImgToBase64('https://gw.alicdn.com/imgextra/i3/O1CN01lsi6bB1O7PK4ba7GK_!!6000000001658-2-tps-90-70.png').then(base64 => {
 * console.log('生成的base64位：', base64)
 * })
 * ```
 * @example appoint type
 * ```ts
 * import { data } from 'onex-utils';
 *
 * const { ImgType, getImgToBase64 } = data;
 *
 * getImgToBase64('https://gw.alicdn.com/imgextra/i3/O1CN01lsi6bB1O7PK4ba7GK_!!6000000001658-2-tps-90-70.png', { type: ImgType.PNG }).then(base64 => {
 * console.log('生成的base64位：', base64)
 * })
 * ```
 *
 * @param url - 需要转化的url链接
 * @param options - 非必选，针对生成base64进行配置，具体配置 {@link ImgOptions}
 * @returns - data base64
 */
export const getImgToBase64 = (
  url: string,
  options?: ImgOptions,
): Promise<string> => {
  const { type = ImgType.PNG, quality = 1 } = options ?? {};

  return new Promise((success, fail) => {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(type, quality);
      success(dataURL);
      canvas = null;
    };
    img.onerror = (err) => {
      fail(err);
    };
    img.src = url;
  });
};
