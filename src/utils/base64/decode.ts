// private property
const _keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
 * base64 加密
 */
export const encode = (content = '') => {
    let input = content;
    let output = '';
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            // eslint-disable-next-line no-multi-assign
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
    }
    return output;
};

function _utf8_encode(content: string) {
    const decode = content.replace(/\r\n/g, '\n');
    let code = '';
    for (let n = 0; n < decode.length; n++) {
        const c = decode.charCodeAt(n);
        if (c < 128) {
            code += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
            code += String.fromCharCode((c >> 6) | 192);
            code += String.fromCharCode((c & 63) | 128);
        } else {
            code += String.fromCharCode((c >> 12) | 224);
            code += String.fromCharCode(((c >> 6) & 63) | 128);
            code += String.fromCharCode((c & 63) | 128);
        }
    }
    return code;
}
