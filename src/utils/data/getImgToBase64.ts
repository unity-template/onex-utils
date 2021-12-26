export enum ImgType {
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  /**
   * 只是标识，无实际意义
   */
  APNG = 'image/apng',
  /**
   * 只有在chrome中支持
   */
  WEBP = 'image/webp',
  GIF = 'image/gif',
}

export interface ImgOptions {
  /**
   * 图片类型 {@link ImgType}
   */
  type?: ImgType;
  /**
   * 在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92
   * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL | MDN}
   */
  quality?: number;
}

/**
 * 将图片的 url 转为 base64 格式
 *
 * @remarks
 * 如果img对应的图片是APNG形式的（或者是后缀为png的动图），请指定类型为APNG或者不传函数的第二个参数
 *
 *
 * @example not options
 * ```ts
 * import { data } from 'onex-utils';
 * data.getImgToBase64('https://gw.alicdn.com/imgextra/i3/O1CN01lsi6bB1O7PK4ba7GK_!!6000000001658-2-tps-90-70.png').then(base64 => {
 * console.log('生成的base64位：', base64)
 * })
 * ```
 *
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
 * @example 针对APNG动图
 *
 * ```ts
 * import { data } from 'onex-utils';
 * data.getImgToBase64('https://ossgw.alicdn.com/ace-tiny-resources/platform/pre/capture/d016edec-5043-4b49-b34c-0ecf4f6ba3c6/2021-01-21/628408979991_n88QCNZhztEQOHStkgBdeWN4_frame.apng')
 * .then(base64 => {
 *    console.log('生成的base64为：', base64)
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
    if (options && options?.type === ImgType.APNG) return getImgBase64ByFetch(url);

    return getImgBase64ByCanvas(url, options);
};

async function getImgBase64ByCanvas(
    url: string,
    options?: ImgOptions,
): Promise<string> {
    const { type = ImgType.PNG, quality = 1 } = options || {};
    let canvas: HTMLCanvasElement | null = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    return await new Promise((resolve, reject) => {
        img.onload = function () {
            if (!canvas) return;
            canvas.height = img.height;
            canvas.width = img.width;
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(type, quality);
      resolve(dataURL);
      canvas = null;
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = url;
    });
}

async function getImgBase64ByFetch(url: string) {
    const ImgBlob = await fetch(url).then((response) => response.blob());
    return transformBlob2Base64(ImgBlob);
}

function transformBlob2Base64(content: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const IFileReader = new FileReader();
        IFileReader.onload = (e) => {
            const result = e?.target?.result;
            if (typeof result !== 'string') {
                reject(new Error('Conversion of dataUrl error'));
            } else {
                resolve(result);
            }
        };
        IFileReader.onerror = (error) => {
            reject(error);
        };
        IFileReader.readAsDataURL(content);
    });
}
