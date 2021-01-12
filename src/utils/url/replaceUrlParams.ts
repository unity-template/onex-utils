import qs from 'qs';

/**
 * 获取当前URL除去URL的查询参数和锚点部分
 *
 * @param url - current {@link window.location.href}
 * @internal
 */
function getUrlHostAndPath(url: string): string {
  const nw = url.split('?');
  return nw[0];
}

/**
 * 替换当前URL上的参数并生成新的链接
 *
 * @remarks
 * 如果当前URL上不存在传入的参数，也会直接添加到新生成的URL后
 * 替换当前location.href上的参数，生成新的链接
 *
 * @example normal
 * ```ts
 * import { url } from 'onex-utils';
 * const { replaceUrlParams } = url;
 * replaceUrlParams({ a: 1 });
 * ```
 *
 * @param newParams - 需要替换的URL新参数，如果原链接中存在将会进行覆盖
 * @returns with query prefix url
 */
export function replaceUrlParams(newParams: Record<string, any>) {
  const currentSearch = window?.location?.search;
  const currentUrl = window?.location?.href;
  if (!currentUrl) return '';

  try {
    const params = {
      ...(qs.parse(currentSearch, { ignoreQueryPrefix: true }) || {}),
      ...newParams,
    };
    const hostAndPath = getUrlHostAndPath(currentUrl);
    const search = qs.stringify(params, { addQueryPrefix: true });
    return `${hostAndPath}${search}`;
  } catch (error) {
    return '';
  }
}
