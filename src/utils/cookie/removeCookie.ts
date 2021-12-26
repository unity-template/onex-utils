import { setCookie } from './setCookie';

/**
 * remove 一个 cookie
 */
export function removeCookie(name: string, attribute: object) {
    setCookie(
        name,
        '',
        Object.assign({}, attribute, {
            expires: -1,
        }),
    );
}
