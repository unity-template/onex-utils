import ObjectHash from 'object-hash';

type ScriptDomType = HTMLScriptElement | HTMLStyleElement | HTMLLinkElement;

const SCRIPT_DOWNLOAD_TASK: Record<string, Promise<void>> = {};
const SCRIPT_DOM_LIST: Record<string, ScriptDomType> = {};
const SCRIPT_OPTION_ID = 'data-configHashId';

export enum ScriptType {
  javascript = 'text/javascript',
  css = 'text/css',
}

interface InsertOptions {
  type: ScriptType;
  src?: string;
  content?: string;
  extOptions?: Record<string, string>;
  /**
   * 脚本超时等待时间，单位毫秒
   * @defaultValue 3000
   */
  loadTimeout?: number;
  /**
   * 指定脚本插入的容器
   * @defaultValue 页面的head元素
   */
  containerNode?: Element;
}

/**
 * 动态插入Js或者Css脚本
 *
 * @example 插入css
 * ```ts
 * import { dom, url } from 'onex-utils';
 * dom.insertScript({
 *  type: dom.ScriptType.css,
 *  src: 'https://test.css',
 * }).then(() => {
 *  console.log('脚本加载完成');
 * })
 * ```
 *
 * @example 插入js
 * @remarks 针对umd类型的script脚本，可以在then中通过window对象
 * 获取其绑定的方法
 * ```ts
 * import { dom, url } from 'onex-utils';
 * dom.insertScript({
 *  type: dom.ScriptType.javascript,
 *  src: 'https://test.js',
 * }).then(() => {
 *  console.log('脚本加载完成，获取绑定的内容：', window?._render_);
 * })
 * ```
 *
 * @example 插入 css content
 * @remarks 使用css变量修改全局变量
 * ```ts
 * import { dom } from 'onex-utils';
 *
 * dom.insertScript({
 *  type: dom.ScriptType.javascript,
 *  content: ':root {--main-bg-color: brown;}"',
 * }).then(() => {
 *  console.log('脚本加载完成');
 * })
 * ```
 *
 * @example 插入js content
 * @remarks 将脚本内容通过script标签掺入HTML head标签中
 * ```ts
 * import { dom } from 'onex-utils';
 *
 * dom.insertScript({
 *  type: dom.ScriptType.javascript,
 *  content: 'window.test="hello world"',
 * }).then(() => {
 *  console.log('脚本加载完成，获取绑定的内容：', window?.test);
 * })
 * ```
 */
export function insertScript(options: InsertOptions): Promise<void> {
    const optionsHashId = ObjectHash({
        ...options,
        loadTimeout: 0,
        containerNode: undefined,
    });

    if (isScriptExist(options, optionsHashId)) {
        return SCRIPT_DOWNLOAD_TASK[optionsHashId] ?? Promise.resolve();
    }

    const currentScriptDom =
    SCRIPT_DOM_LIST[optionsHashId] ??
    (SCRIPT_DOM_LIST[optionsHashId] = createScriptElement(
        options,
        optionsHashId,
    ));

    const task =
    SCRIPT_DOWNLOAD_TASK[optionsHashId] ??
    (SCRIPT_DOWNLOAD_TASK[optionsHashId] = createDownloadTask(
        options,
        currentScriptDom,
    ));

    return task;
}

function createScriptElement(
    options: InsertOptions,
    configHashId: string,
): ScriptDomType {
    const { type, src, content } = options;
    const attributes: Record<string, string> = {
        ...(options.extOptions || {}),
        [SCRIPT_OPTION_ID]: configHashId,
    };
    let element!: ScriptDomType;

    switch (type) {
    case ScriptType.css: {
        if (src) {
            element = document.createElement('link') as HTMLLinkElement;
            attributes['href'] = src;
            attributes['type'] = ScriptType.css;
            attributes['rel'] = 'stylesheet';
        } else if (content) {
            element = document.createElement('style') as HTMLStyleElement;
            attributes['type'] = ScriptType.css;
            attributes['rel'] = 'stylesheet';
        }
        break;
    }
    case ScriptType.javascript: {
        element = document.createElement('script') as HTMLScriptElement;
        attributes['type'] = ScriptType.javascript;
        if (src) {
            attributes['src'] = src;
        }
        break;
    }
    default:
        break;
    }

    if (content && element) {
        element.innerHTML = content;
    }

    if (element) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    return element;
}

function createDownloadTask(
    options: InsertOptions,
    dom: ScriptDomType,
): Promise<void> {
    const { src, content, loadTimeout, containerNode = document.head } = options;

    return new Promise((resolve, reject) => {
        const container = containerNode;
        if (!dom) reject(new Error('script dom not exist!'));

        if (src) {
            dom.addEventListener('load', () => resolve(undefined));
            dom.addEventListener('error', (err) => reject(err));
        } else if (content) {
            resolve(undefined);
        } else {
            reject(new Error('script loader error'));
        }

        setTimeout(() => {
            reject(new Error('script load timeout!'));
        }, loadTimeout);

        container.appendChild(dom);
    });
}

function isScriptExist(option: InsertOptions, hashId: string) {
    const { src, containerNode = document.head } = option;
    const labelEntries = Object.fromEntries([
        ['link', 'href'],
        ['script', 'src'],
        ['style', ''],
    ]);
    const labelName = Object.keys(labelEntries);

    const isOnexUtilsExist = labelName.some(
        (label) =>
            !!containerNode.querySelector(`${label}[${SCRIPT_OPTION_ID}="${hashId}"]`),
    );

    const isScriptUrlExist = src
        ? labelName
            .filter((label) => labelEntries[label])
            .some(
                (label) =>
                    !!document.querySelector(
                        `${label}[${labelEntries[label]}="${src}"]`,
                    ),
            )
        : false;

    return isOnexUtilsExist && isScriptUrlExist;
}
