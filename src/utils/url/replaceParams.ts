import qs from 'qs';

function getUrl(url: string) {
  const nw = url.split('?');
  return nw[0];
}

/**
 * 替换当前URL上的参数生成新的链接
 *
 * @remarks
 * 如果当前URL上不存在传入的参数，也会直接添加到新生成的URL后
 *
 * @param {Record<string, any>} newParams
 * @description 替换当前location.href上的参数，生成新的链接
 * @returns with query prefix url
 */
export function replaceUrlParams(newParams: Record<string, any>) {
  try {
    const params = {
      ...(qs.parse(window.location.search, { ignoreQueryPrefix: true }) || {}),
      ...newParams,
    };
    return `${getUrl(window.location.href)}${qs.stringify(params, {
      addQueryPrefix: true,
    })}`;
  } catch (error) {
    return '';
  }
}
