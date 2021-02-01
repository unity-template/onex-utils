# [onex-utils](https://unity-template.github.io/onex-utils/index.html) &middot; [![npm version](https://img.shields.io/npm/v/onex-utils.svg?style=flat)](https://www.npmjs.com/package/onex-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/unity-template/onex-utils/blob/master/LICENSE) [![codeCov](https://codecov.io/github/unity-template/onex-utils/coverage.svg?branch=master)](https://codecov.io/gh/unity-template/onex-utils) [![Travis (.org)](https://img.shields.io/travis/unity-template/onex-utils)](https://www.travis-ci.org/github/unity-template/onex-utils) [![npm](https://img.shields.io/npm/dt/onex-utils)](https://www.npmjs.com/package/onex-utils)

沉淀业务开发过程中编写的一些业务函数和实现上采用的一些方案，避免业务开发过程中多仓库之间的代码的复制粘贴，将业务开发过程中将一些能力沉淀的此仓库中进行长期维护和迭代

### 1. 模板说明
需要在vscode中安装eslint、stylelint 两个插件做代码格式校验

### 2. 模板命令
* `npm run start` 项目启动命令
* `npm run build` 项目构建命令
* `npm run commit` 统一使用这个命令提交代码
* `npm run lint` 对css样式表和ts代码格式进行校验，如果对规则存在问题，请联系项目开发者提交

### 3. 通用能力

* [文档生成](https://tsdoc.org/)
* [测试能力](https://jestjs.io/)
* [TS工具类型](https://github.com/sindresorhus/type-fest)

### 4. 配套插件
#### 1.babel-plugin-onex-utils (babel、webpack)

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


#### 2. build-plugin-onex-utils（build-scripts）
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