# babel

希伯来语 巴别塔

## 使用

@babel/cli 提供了一个命令 `babel`

```shell
# 按文件编译
babel 要编译的文件 -o 编辑结果文件

# 按目录编译
babel 要编译的整个目录 -d 编译结果放置的目录
```

## 配置

babel本身没有做任何事情，真正的编译需要依靠预设和插件配置来完成

### 预设

文件内容: js/presets.js --> 转换后的内容: dist/presets.js

```json
// .babelrc
// 如果配置字符串形式的 @babel/preset-env ，则只会转换新的语法，不会转换新的api
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

如果需要转换新的api还需要借助其余配置并配合core-js按需引入api

需要将预设写为数组形式,数组的第二项写该预设的配置项
```json
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
       "useBuiltIns": "usage", // 按需引入api
       "corejs": 3 // corejs版本为3
    }]
  ],
  "plugins": []
}
```

```js
// js/a.js --> dist/a.js
// dist/a.js
"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var a = 1;
new Promise(function (resolve) {
  resolve();
});
```

### 插件

文件内容: js/plugins.js --> 转换后的内容: dist/plugins.js

除了预设可以转换代码外,插件也可以转换代码

- 插件在presets前运行
- 插件顺序从前往后排列
- presets顺序时颠倒的(从后往前)

`@babel/preset-env` 只转换那些已经形成正式标准的语法,对于某些处于早期阶段,还没有确定的语法不做转换

对于这些语法,就需要安装单独的插件

1. `@babel/plugin-proposal-class-properties` -- 可以在类中书写初始化字段
2. `@babel/plugin-proposal-function-bind` -- 轻松的为某个方法绑定this
3. `@babel/plugin-proposal-optional-chaining` -- 可选链操作
4. `babel-plugin-transform-remove-console` -- 用于移除代码中所有的控制台输出语句,生产环境中可使用此插件来去除控制台输出
5. `@babel/plugin-transform-runtime` -- 用于提供一些公共的API，这些API会帮助代码转换

--- 

## 结合webpack


