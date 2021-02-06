# [onex-utils](https://unity-template.github.io/onex-utils/index.html) &middot; [![npm version](https://img.shields.io/npm/v/onex-utils.svg?style=flat)](https://www.npmjs.com/package/onex-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/unity-template/onex-utils/blob/master/LICENSE) [![codeCov](https://codecov.io/github/unity-template/onex-utils/coverage.svg?branch=master)](https://codecov.io/gh/unity-template/onex-utils) [![Travis (.org)](https://img.shields.io/travis/unity-template/onex-utils)](https://www.travis-ci.org/github/unity-template/onex-utils) [![npm](https://img.shields.io/npm/dt/onex-utils)](https://www.npmjs.com/package/onex-utils)

简体中文 | [English](./README-en-GB.md)


沉淀业务开发过程中编写的一些业务函数和实现上采用的一些方案，避免业务开发过程中多仓库之间的代码的复制粘贴，将业务开发过程中将一些能力沉淀的此仓库中进行长期维护和迭代。文档 ☞ ：[click me](https://unity-template.github.io/onex-utils/index.html)

### 1. 项目命令
* `npm run start` 项目启动命令
* `npm run build` 项目构建命令
* `npm run commit` 统一使用这个命令提交代码
* `npm run lint` 对css样式表和ts代码格式进行校验，如果对规则存在问题，请联系项目开发者提交

### 2. 通用能力

* [注释规范](https://tsdoc.org/)
* [文档生成](https://github.com/TypeStrong/typedoc)
* [测试能力](https://jestjs.io/)
* [TS工具类型](https://github.com/sindresorhus/type-fest)

### 3. 使用方式

⚠️ ‼️ 非`onex-utils`维护人员参与的线上业务中使用，为保证稳定性，推荐锁版本使用

#### 1) 通过npm方式
安装：
```shell
$ npm install onex-utils --save
```
使用：
```ts
import { type } from 'onex-utils';

console.log(type.isTrue('true')); // true
```

#### 2) 通过CDN方式 · [![](https://data.jsdelivr.com/v1/package/npm/onex-utils/badge)](https://www.jsdelivr.com/package/npm/onex-utils)

安装：

```html
<script src="https://cdn.jsdelivr.net/npm/onex-utils@latest/dist/index.umd.min.js"></script>
```

使用：
```ts
console.log(onexUtils.type.isTrue('true'));
```

### 4. 配套插件
#### 1) babel-plugin-onex-utils (babel、webpack)

<details>
<summary>CLICK ME</summary>


#### Install
```shell
$ npm i --save onex-utils
$ npm i --save-dev babel-plugin-onex-utils @babel/cli @babel/preset-env
```


#### Example
Transforms

```ts
import { capitalize, map } from 'onex-utils';

map([], capitalize);
```
roughly to

```ts
"use strict";

var _map2 = _interopRequireDefault(require("onex-utils/build/utils/map"));

var _capitalize2 = _interopRequireDefault(require("onex-utils/build/utils/capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _map2["default"])([], _capitalize2["default"]);
```

#### Usage
.babelrc
```json
{
  "plugins": ["onex-utils"],
  "presets": [["@babel/env", { "targets": { "node": 6 } }]]
}
```
Babel API
```ts
require('babel-core').transform('code', {
  'plugins': ['onex-utils'],
  'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
})
```
webpack.config.js

```ts
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['onex-utils'],
      'presets': [['@babel/env', { 'targets': { 'node': 6 } }]]
    }
  }]
}
```
</details>


#### 2) build-plugin-onex-utils（build-scripts）
<details>
<summary>CLICK ME</summary>

#### Install
```shell
$ npm install @alib/build-scripts build-plugin-utils build-plugin-component --save-dev 
```

#### Usage（和rax结合使用）
build.json
```json
{
  "type": "rax",
  "targets": [
    "web"
  ],
  "plugins": [
    "build-plugin-component",
    "build-plugin-onex-utils"
  ]
}
```
package.json
```json
{
  "main": "build/index.js",
  "types": "./lib",
  "files": [
    "dist",
    "es",
    "lib"
  ],
  "scripts": {
    "build": "build-scripts build"
  }
}
```
cli
```shell
$ npm run build
```

</details>


### 5. 常见问题

**1) 引入工具包，导致undefined报错**

<details>
<summary>CLICK ME</summary>

**源码：**

```ts
import onexUtils from 'onex-utils';
console.log(onexUtils.url);
```

**报错：**

![](https://gw.alicdn.com/imgextra/i3/O1CN01lNHI3H22N3UvEahcN_!!6000000007107-2-tps-1448-382.png)

**修改方式：**

1. 如果是JS项目，通过namescpae的导入方式导入

```ts
import * as onexUtils from 'onex-utils';
```

1. 如果是ts文件，通过配置`tsconfig.json`解决构建问题

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
  }
}
```
</details>