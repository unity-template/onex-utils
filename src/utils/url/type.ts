import axios, { AxiosResponse } from 'axios';

/**
 *判断图片链接对应资源的类型
 *
 * @remarks
 * 会模拟请求链接对应的资源的，然后根据请求头的content-type判断对应资源的类型
 * 需要注意浏览器中使用注意同源策略，可能有些链接的请求直接被浏览器拦截
 */
export function type(url: string): UrlType {
  const urlType = new UrlType(url);
  return urlType;
}

enum ContentType {
  json = 'application/json',
  xml = 'text/xml',
  gif = 'image/gif',
  jpeg = 'image/jpeg',
  jpg = 'image/jpeg',
  png = 'image/png',
  css = 'text/css',
  javascript = 'text/javascript',
}

function isUrl(target: UrlType, _: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  const localhostDomainRE = /^localhost[\\:?\d]*(?:[^\\:?\d]\S*)?$/;
  const nonLocalhostDomainRE = /^[^\s\\.]+\.\S{2,}$/;

  return Object.assign({}, descriptor, {
    async value() {
      if (!this.url) return false;
      const [url, domain] = this.url.match(protocolAndDomainRE) || [];

      if (!url || !domain) {
        return false;
      }

      if (localhostDomainRE.test(domain) || nonLocalhostDomainRE.test(domain)) {
        return oldValue.bind(this)();
      }
      return false;
    },
  });
}

class UrlType {
  url: string;
  contentType: Promise<string>;

  constructor(url: string) {
    this.url = url;
    this.contentType = this.getUrlResponseContentType();
  }

  @isUrl
  async isPng() {
    const contentType = await this.contentType;
    return contentType === ContentType.png;
  }

  @isUrl
  async isJpeg() {
    const contentType = await this.contentType;
    return contentType === ContentType.jpeg;
  }

  @isUrl
  async isGif() {
    const contentType = await this.contentType;
    return contentType === ContentType.gif;
  }

  @isUrl
  async isJpg() {
    const contentType = await this.contentType;
    return contentType === ContentType.jpg;
  }

  @isUrl
  async isImage() {
    const imgReg = /^image\//;
    const contentType = await this.contentType;
    return imgReg.test(contentType);
  }

  @isUrl
  async isJson() {
    const contentType = await this.contentType;
    return contentType === ContentType.json;
  }

  @isUrl
  async isCss() {
    const contentType = await this.contentType;
    return contentType === ContentType.css;
  }

  @isUrl
  async isJs() {
    const contentType = await this.contentType;
    return contentType === ContentType.javascript;
  }

  private async getUrlResponseContentType(): Promise<string> {
    try {
      let res: AxiosResponse<any>;
      try {
        res = await axios.head(this.url);
      } catch (e) {
        res = await axios.get(this.url);
      }
      if (res && res.status >= 200 && res.status < 300) {
        const { headers } = res;
        const contentType = headers?.['content-type'];
        return contentType;
      }
      return '';
    } catch {
      return '';
    }
  }
}
