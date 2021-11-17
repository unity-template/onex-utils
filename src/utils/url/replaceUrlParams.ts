import qs from 'qs';
import chunk from 'lodash.chunk';

interface ReplaceParamsOptions {
  /**
   * 不使用当前URL，使用传入的URL
   */
  url?: string;
}

/**
 * 替换当前URL上的参数并生成新的链接
 *
 * @remarks
 * 如果当前URL上不存在传入的参数，也会直接添加到新生成的URL后
 * 替换当前location.href上的参数，生成新的链接
 *
 * @remarks
 * 针对带有hash的链接，需要遵循先search参数，后hash参数的原则
 *
 * @example normal
 * ```ts
 * import { url } from 'onex-utils';
 * const { replaceUrlParams } = url;
 * replaceUrlParams({ a: 1 });
 * ```
 *
 * @example assign url option
 * ```ts
 * import { url } from 'onex-utils';
 *
 * const { replaceUrlParams } = url;
 * replaceUrlParams({node: 'test'}, { url: 'https://taobao.com/pribuy#/firstbuy/list?node=1' });
 * ```
 *
 * @param newParams - 需要替换的URL新参数，如果原链接中存在将会进行覆盖
 * @param options - 自定义配置参数
 * @returns with query prefix url
 */
export function replaceUrlParams(
  newParams: Record<string, any>,
  options?: ReplaceParamsOptions,
) {
  const currentUrl = options?.url ?? window?.location?.href;
  if (!currentUrl) return '';

  const {
    host,
    hash: currentHash,
    search: currentSearch,
  } = getUrlHashAndSearch(currentUrl);

  try {
    const params = {
      ...(qs.parse(currentSearch, { ignoreQueryPrefix: true }) || {}),
      ...newParams,
    };
    const search = qs.stringify(params, { addQueryPrefix: true });
    return `${host}${search}${currentHash}`;
  } catch (error) {
    return '';
  }
}

function getUrlHashAndSearch(url: string): {
  hash: string;
  search: string;
  host: string;
} {
  // eslint-disable-next-line no-useless-escape
  const [host, ...paramsArr] = url.split(/(\?|\#)/g);
  let standardParamsArr = paramsArr;

  // 需要遵循先 search 后 hash
  if (paramsArr.length === 4) {
    if (paramsArr[0] === '#') {
      standardParamsArr = [paramsArr.shift(), paramsArr.join('')].filter(
        (i) => i,
      ) as string[];
    }
  }

  const params = new Map(chunk(standardParamsArr, 2));
  const hash = params.get('#') as string;
  const search = params.get('?') as string;

  return {
    host,
    hash: hash ? `#${hash}` : '',
    search: search ? `?${search}` : '',
  };
}
