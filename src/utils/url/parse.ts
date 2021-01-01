import qs from 'qs';

/**
 * parse the url
 *
 * @remarks
 * 借用qs对应的方法，文档见：{@link https://github.com/ljharb/qs#parsing-objects|parsing-objects}
 *
 */
export const parseUrl = qs.parse;
