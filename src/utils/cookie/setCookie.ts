const converter = {
  read(value) {
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent,
    );
  },
};

const defaultAttribute = {
  path: '/',
};

export function setCookie(key, value, attributes) {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const newAttributes = Object.assign({}, defaultAttribute, attributes);

  if (typeof newAttributes.expires === 'number') {
    newAttributes.expires = new Date(
      Date.now() + newAttributes.expires * 864e5,
    );
  }
  if (newAttributes.expires) {
    newAttributes.expires = newAttributes.expires.toUTCString();
  }

  const newKey = encodeURIComponent(key)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);

  const newValue = converter.write(value);

  let stringifiedAttributes = '';
  for (const attributeName in newAttributes) {
    if (!newAttributes[attributeName]) {
      continue;
    }

    stringifiedAttributes += `; ${attributeName}`;

    if (newAttributes[attributeName] === true) {
      continue;
    }

    stringifiedAttributes += `=${newAttributes[attributeName].split(';')[0]}`;
  }

  document.cookie = `${newKey}=${newValue}${stringifiedAttributes}`;
  return document.cookie;
}
