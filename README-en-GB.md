# [onex-utils](https://unity-template.github.io/onex-utils/index.html) &middot; [![npm version](https://img.shields.io/npm/v/onex-utils.svg?style=flat)](https://www.npmjs.com/package/onex-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/unity-template/onex-utils/blob/master/LICENSE) [![codeCov](https://codecov.io/github/unity-template/onex-utils/coverage.svg?branch=master)](https://codecov.io/gh/unity-template/onex-utils) [![Travis (.org)](https://img.shields.io/travis/unity-template/onex-utils)](https://www.travis-ci.org/github/unity-template/onex-utils) [![npm](https://img.shields.io/npm/dt/onex-utils)](https://www.npmjs.com/package/onex-utils)

[简体中文](./README.md) | English

✨ Some business functions written in the process of precipitation business development and some implementation schemes are adopted to avoid code duplication between multiple warehouses in the process of business development, and to carry out long-term maintenance and iteration in this warehouse that has accumulated some capabilities during business development. Document address: [click me](https://unity-template.github.io/onex-utils/index.html)


### 1. Project command
* `npm run start` Project start command
* `npm run build` Project build command
* `npm run commit` Use this command to submit code
* `npm run lint` Check the css style sheet and ts code format. If there is a problem with the rules, please contact the project developer to change


### 2. General ability

* [Annotation specification](https://tsdoc.org/)
* [Document generation](https://github.com/TypeStrong/typedoc)
* [Project test](https://jestjs.io/)
* [TS tool type](https://github.com/sindresorhus/type-fest)


### 3. How to use


⚠️ ‼️ Used in online business where non-`onex-utils` maintainers participate. To ensure stability, it is recommended to use the locked version

#### 1) Via npm

install:
```shell
$ npm install onex-utils --save
```
usage：
```ts
import { type } from 'onex-utils';

console.log(type.isTrue('true')); // true
```

#### 2) Via CDN · [![](https://data.jsdelivr.com/v1/package/npm/onex-utils/badge)](https://www.jsdelivr.com/package/npm/onex-utils)

install:

```html
<script src="https://cdn.jsdelivr.net/npm/onex-utils@latest/dist/index.umd.min.js"></script>
```

usage:
```ts
console.log(onexUtils.type.isTrue('true'));
```

### 4. Engineering plugin
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

#### Usage(Used in conjunction with rax)

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


### 5. Common problem

**1) The toolkit was introduced, causing undefined error**

<details>
<summary>CLICK ME</summary>

**code:**

```ts
import onexUtils from 'onex-utils';
console.log(onexUtils.url);
```

**error:**

![](https://gw.alicdn.com/imgextra/i3/O1CN01lNHI3H22N3UvEahcN_!!6000000007107-2-tps-1448-382.png)

**Modification method：**

1. If it is a JS project, import it through the import method of namescpae

```ts
import * as onexUtils from 'onex-utils';
```

1. If it is a ts file, solve the build problem by configuring `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
  }
}
```

</details>