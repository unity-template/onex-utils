/**
 * 判断接口返回的是否为true
 *
 * @remarks
 * 阿里mtop接口请求，针对boolean进行判断，其他业务禁用
 *
 * @deprecated 只适合阿里相关业务场景，其他业务场景勿使用
 */
export function isTrue(value: string | boolean) {
  if (value === 'true') return true;
  return !!value;
}
