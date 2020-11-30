const extract = require('url-querystring');
const qs = require('qs');

/**
 *
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
    return `${extract(window.location.href).url}${qs.stringify(params, {
      addQueryPrefix: true,
    })}`;
  } catch (error) {
    return '';
  }
}
