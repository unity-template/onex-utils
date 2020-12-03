import { setCookie } from './setCookie';

export function removeCookie(name: string, attribute) {
  setCookie(
    name,
    '',
    Object.assign({}, attribute, {
      expires: -1,
    }),
  );
}
