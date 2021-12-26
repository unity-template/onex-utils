/**
 * 将 file、blob、stream 格式 转 DateURL
 *
 * @remarks
 * 将blob对象转为DataUrl类型的数据
 *
 * @throws {@link ProgressEvent}
 */
export const blobToDataURL = (
    blob: Blob | File,
): Promise<string | ArrayBuffer> => {
    return new Promise((success, fail) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
            success(reader.result ?? '');
        };
        reader.onerror = (err) => {
            fail(err);
        };
    });
};
