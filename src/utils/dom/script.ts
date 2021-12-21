export enum ScriptType {
  javascript = 'text/javascript',
  css = 'text/css',
}

interface InsertOptions {
  type: ScriptType;
  extOptions?: Record<string, string>;
  src?: string;
  content?: string;
}

/**
 * 动态插入Js或者Css脚本
 *
 * @example 插入css
 * ```ts
 * import { dom } from 'onex-utils';
 * dom.insertScript({
 *  type: dom.ScriptType.css,
 *  src: 'https://test.css',
 * })
 * ```
 */
export function insertScript(options: InsertOptions) {
  const ele = getElement(options);
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(ele);
}

function getElement(options: InsertOptions) {
  const { type, src, content } = options;
  let elementName = '';
  const attributes: Record<string, string> = { ...(options.extOptions || {}) };

  switch (type) {
    case ScriptType.css: {
      if (src) {
        elementName = 'link';
        attributes.href = src;
      } else if (content) {
        elementName = 'style';
      }
      attributes.type = ScriptType.css;
      attributes.rel = 'stylesheet';
      break;
    }
    case ScriptType.javascript: {
      elementName = 'script';
      attributes.type = ScriptType.javascript;
      break;
    }
    default:
      break;
  }
  const ele = document.createElement(elementName);

  if (content) {
    ele.innerHTML = content;
    delete attributes.content;
  }

  Object.keys(attributes).forEach((key) => {
    ele.setAttribute(key, attributes[key]);
  });

  return ele;
}
