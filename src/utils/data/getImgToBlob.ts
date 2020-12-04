import { getImgToBase64 } from './getImgToBase64';
import { dataURLtoBlob } from './dataURLtoBlob';

/**
 * 将图片的 url 转为 Blob 格式
 * @param {URL} url
 * @returns {Promise<Blob>}
 */
export const getImgToBlob = async (url) => {
  const dataURL = await getImgToBase64(url);
  const blob = await dataURLtoBlob(dataURL);
  return blob;
};
