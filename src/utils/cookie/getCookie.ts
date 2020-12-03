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

export function getCookie(name?: string) {
  if (typeof document === 'undefined' || (arguments.length && !name)) {
    return;
  }

  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all.
  const cookies = document?.cookie.split('; ') || [];
  const cookiesObj = {};
  for (const cookieStr of cookies) {
    const parts = cookieStr.split('=');
    let value = parts.slice(1).join('=');

    if (value[0] === '"') {
      value = value.slice(1, -1);
    }

    try {
      const foundKey = converter.read(parts[0]);
      cookiesObj[foundKey] = converter.read(value);

      if (name === foundKey) {
        break;
      }
    } catch {
      continue;
    }
  }

  return name ? cookiesObj[name] : cookiesObj;
}
