# [onex-utils](https://unity-template.github.io/utils/index.html) &middot; [![npm version](https://img.shields.io/npm/v/onex-utils.svg?style=flat)](https://www.npmjs.com/package/onex-utils) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/unity-template/utils/blob/master/LICENSE) [![codeCov](https://codecov.io/github/unity-template/utils/coverage.svg?branch=master)](https://codecov.io/gh/unity-template/utils) [![Travis (.org)](https://img.shields.io/travis/unity-template/utils)](https://www.travis-ci.org/github/unity-template/utils) [![npm](https://img.shields.io/npm/dt/onex-utils)](https://www.npmjs.com/package/onex-utils)

沉淀业务开发过程中编写的一些业务函数或者采用开源的一些方案，避免多仓库之间的代码的复制，希望能够从业务开发过程中将一些能力沉淀的此仓库中进行长期维护，[API文档](https://unity-template.github.io/utils/index.html)

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

### 4. 函数文档
 TODO

### 5. 路线图
* 功能
  * 【done】基础的工具函数
  * 【done】测试用例编写
  * 【done】代码格式
    * 【done】添加eslint-plugin-tsdoc校验代码注释格式
  * build-script构建器分包
* CI/CD流程
  * 【done】依据tag发布
  * 【done】自动运行测试用例并上传至codecov进行代码覆盖度统计
  * 【done】文档自动部署
  * 更加健全的发布部署链路
  * 干净方便的发布npm包
* 文档
  * 【done】文档生成
  * 深入typeDoc生成utils专属文档
  * 项目changelog生成
  
