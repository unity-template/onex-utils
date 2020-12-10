/**
 *触发设备的文件下载功能
 */
export function downloadFile(
  fileName: string,
  content: BlobPart,
  type = 'text/plain',
) {
  const element = document.createElement('a');
  const blob = new Blob([content], { type });
  element.href = URL.createObjectURL(blob);
  element.download = fileName;
  element.addEventListener('click', (e) => e.stopImmediatePropagation());
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
