export const downloadFile = (fileName, content, type = 'text/plain') => {
  const el = document.createElement('a');
  const blob = new Blob([content], { type });
  el.href = URL.createObjectURL(blob);
  el.download = fileName;
  el.addEventListener('click', (e) => e.stopImmediatePropagation());
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};
