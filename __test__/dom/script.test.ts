import { dom } from '../../src/index';

const { insertScript, ScriptType } = dom;

describe('insert script', () => {
    afterEach(() => {
        document.head.innerHTML = '';
        document.body.innerHTML = '';
    });

    it('should insert css content dom', async () => {
        await insertScript({
            type: ScriptType.css,
            content: '内容',
        });
        expect(document.getElementsByTagName('style').length).toEqual(1);
    });

    it('should insert js content dom', async () => {
        await insertScript({
            type: ScriptType.javascript,
            content: 'console.log("hello world")',
        });
        expect(document.getElementsByTagName('script').length).toEqual(1);
    });

    it('should insert css url dom', async () => {
        await insertScript({
            type: ScriptType.css,
            src: 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css',
            loadTimeout: 10000,
        });
        expect(document.getElementsByTagName('link').length).toEqual(1);
    });

    it('should insert js url dom', async () => {
        await insertScript({
            type: ScriptType.javascript,
            src: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js',
            loadTimeout: 10000,
        });
        expect(document.getElementsByTagName('script').length).toEqual(1);
    });

    it('should insert only one js dom', async () => {
        const insertDom = () => insertScript({
            type: ScriptType.javascript,
            src: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/mapping.fp.min.js',
            loadTimeout: 10000,
        });
        await Promise.all([insertDom(), insertDom()]);
        expect(document.getElementsByTagName('script').length).toEqual(1);
    });

    it('should insert only one css dom', async () => {
        const insertDom = () => insertScript({
            type: ScriptType.css,
            src: 'https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
            loadTimeout: 10000,
        });
        await Promise.all([insertDom(), insertDom()]);
        expect(document.getElementsByTagName('link').length).toEqual(1);
    });

    it('should insert only one js dom when assign containerNode', async () => {
        const insertDom = () => insertScript({
            type: ScriptType.javascript,
            src: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js',
            loadTimeout: 10000,
            containerNode: document.body,
        });
        await Promise.all([insertDom(), insertDom()]);
        expect(document.body.getElementsByTagName('script').length).toEqual(1);
    });
});
