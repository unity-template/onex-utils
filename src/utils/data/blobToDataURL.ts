/**
 * 将 file、blob、stream 格式 转 DateURL
 * @param {Blob | File } blob
 * @returns {Promise<any>}
 */
export const blobToDataURL = (blob) => {
  return new Promise((succ, fail) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      succ(reader.result);
    };
    reader.onerror = (err) => {
      fail(err);
    };
  });
};
