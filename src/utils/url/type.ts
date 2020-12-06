import request from 'request-promise-native';

interface TypeReturn {
  isImage: () => boolean;
}

export function type(url: string): TypeReturn {
  const urlType = new UrlType(url);
  return {
    ...urlType,
  };
}

function isUrl(target: UrlType, _: string, descriptor: PropertyDescriptor) {
  const { url } = target;
  const oldValue = descriptor.value;
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  const localhostDomainRE = /^localhost[\\:?\d]*(?:[^\\:?\d]\S*)?$/;
  const nonLocalhostDomainRE = /^[^\s\\.]+\.\S{2,}$/;

  return Object.assign({}, descriptor, {
    value: () => {
      if (!url) return false;
      const [protocol, domain] = url.match(protocolAndDomainRE) || [];

      if (!protocol || !domain) {
        return false;
      }

      if (localhostDomainRE.test(domain) || nonLocalhostDomainRE.test(domain)) {
        oldValue();
      }
      return false;
    },
  });
}

class UrlType {
  url: string;
  private contentType: Promise<string>;

  constructor(url: string) {
    this.url = url;
    this.contentType = this.getUrlResponseContentType();
  }

  @isUrl
  isPng() {
    return this.contentType.then((contentType) => {
      return false;
    });
  }

  isImage = () => {
    return this.isPng();
  };

  private async getUrlResponseContentType(): Promise<string> {
    try {
      let res;
      try {
        res = await request({
          method: 'HEAD',
          uri: this.url,
          resolveWithFullResponse: true,
        });
      } catch (e) {
        res = await request({
          method: 'GET',
          uri: this.url,
          resolveWithFullResponse: true,
        });
      }
      if (res && res.statusCode >= 200 && res.statusCode < 300) {
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
