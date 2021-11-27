# [onex-utils](https://unity-template.github.io/onex-utils/index.html) &middot; [![npm version](https://img.shields.io/npm/v/onex-utils.svg?style=flat)](https://www.npmjs.com/package/onex-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/unity-template/onex-utils/blob/master/LICENSE) [![codeCov](https://codecov.io/github/unity-template/onex-utils/coverage.svg?branch=master)](https://codecov.io/gh/unity-template/onex-utils) [![Travis (.org)](https://img.shields.io/travis/unity-template/onex-utils)](https://www.travis-ci.org/github/unity-template/onex-utils) [![npm](https://img.shields.io/npm/dt/onex-utils)](https://www.npmjs.com/package/onex-utils)

沉淀业务开发过程中的通用工具函数，避免业务开发过程中多仓库之间的代码的复制粘贴，将业务开发过程中将通用工具沉淀的此仓库中进行长期维护和迭代，非`onex-utils`维护人员参与的线上业务中使用，为保证稳定性，推荐锁版本使用文档地址：https://unity-template.github.io/onex-utils/index.html



## ✨ 特性

* **稳定可靠**：工具沉淀自高流量业务代码中的业务工具函数
* **按需加载**：提供`babel`、`build-script`插件实现按需加载构建
* **文档生成**：定制[`TypeDoc`](https://github.com/TypeStrong/typedoc)支持`TypeScript interface` 转 `markdown` 文档生成
* **持续集成**：`Github Action` 持续集成和持续交付(静态扫描、安全扫描、[自动测试](https://jestjs.io/)...)

## 🖥 兼容

| [![IE / Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) IE / Edge | [![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) Firefox | [![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) Chrome | [![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) Safari  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE11, Edge                                                   | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 

## 📦 安装
```shell
$ npm install onex-utils --save
```
```shell
$ yarn add onex-utils --save
```

## 🔨 使用

```ts
import { url } from 'onex-utils';

const url_params_key = url.getUrlParams('key');
```

## ⌨️ 开发
- `npm run build`: 项目构建命令
- `npm run test`: 项目运行单元测试
- `npm run commit`: 提交规范化commit
- `npm run lint`: 代码格式进行校验
- `npm version patch`: 发布正式包

## 🤝 贡献

- `Github Issue`编写`features`或者`Bug`
- `fork`仓库编写代码然后提交`Pull Request` 

## 🎯 插件

#### babel-plugin-onex-utils (babel、webpack)

<details>
<summary>➡️ CLICK ME</summary>

#### Install

```shell
$ npm i --save onex-utils
$ npm i --save-dev babel-plugin-onex-utils @babel/cli @babel/preset-env
```

#### Example

Transforms

```ts
import {capitalize, map} from "onex-utils";

map([], capitalize);
```

roughly to

```ts
"use strict";

var _map2 = _interopRequireDefault(require("onex-utils/build/utils/map"));

var _capitalize2 = _interopRequireDefault(
  require("onex-utils/build/utils/capitalize")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

(0, _map2["default"])([], _capitalize2["default"]);
```

#### Usage

.babelrc

```json
{
  "plugins": ["onex-utils"],
  "presets": [["@babel/env", {"targets": {"node": 6}}]]
}
```

Babel API

```ts
require("babel-core").transform("code", {
  plugins: ["onex-utils"],
  presets: [["@babel/env", {targets: {node: 6}}]],
});
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

#### build-plugin-onex-utils（build-scripts）

<details>
<summary>➡️ CLICK ME</summary>

#### Install

```shell
$ npm install @alib/build-scripts build-plugin-utils build-plugin-component --save-dev
```

#### Usage（和 rax 结合使用）

build.json

```json
{
  "type": "rax",
  "targets": ["web"],
  "plugins": ["build-plugin-component", "build-plugin-onex-utils"]
}
```

package.json

```json
{
  "main": "build/index.js",
  "types": "./lib",
  "files": ["dist", "es", "lib"],
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



