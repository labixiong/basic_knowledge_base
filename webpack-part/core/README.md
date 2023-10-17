# webpack

## 如何在浏览器中实现模块化

每个js文件 浏览器内都会进行一次请求 工程如果庞大的话会导致加载更多的js文件

问题：
- 效率问题：精细的模块划分带来了更多的js文件，更多的js文件带来了更多的请求，降低了页面访问效率
- 兼容性问题：浏览器目前仅支持es6的模块化标准，并且还存在兼容性问题
- 工具问题：浏览器不支持npm下载的第三方包

原因：在浏览器端，开发时和运行时的侧重点不一样
开发时：

1. 模块划分越细越好
2. 支持多种模块化标准
3. 支持npm或其他包管理器下载的模块
4. 能够解决其他工程化的问题

运行时：

1. 文件越少越好
2. 文件体积越小越好
3. 代码内容越乱越好
4. 所有浏览器都要兼容
5. 能够解决其他运行时的问题，主要是执行效率问题


解决方法：
既然开发时态和运行时态面临的局面有巨大的差异，因此，我们需要有一个工具，这个工具能够让开发者专心的在开发时态写代码，
然后利用这个工具将开发时态编写的代码转换为运行时态需要的东西。

---

## 模块化兼容性 

commonjs和es6可以相互导出 导入

## 分析打包后结果并分析打包内容

```js
// /dist/my-main.js
;(function(modules) {
  const installedModules = {}

  function _webpack_require(moduleId) {
    if(installedModules[moduleId]) {
      return installedModules[moduleId]
    }

    var func = modules[moduleId]
    var module = {
      exports: {}
    }

    let result = func(module, module.exports, _webpack_require)
    installedModules[moduleId] = result
    return result
  }

  _webpack_require('./src/index.js')
})({
  './src/a.js': function(module, exports) {
    console.log('a');
    module.exports = 'a'
  },
  './src/index.js': function(module, exports, _webpack_require) {
    // const a = _webpack_require('./src/a.js')
    // console.log(a);
    // console.log('index module');
    eval('const a = _webpack_require(\'./src/a.js\')\nconsole.log(a);console.log(\'index module\');const b = null; b.abc()//# sourceURL=./src/index.js')
  }
})
```

## 配置文件

```json
// package.json
"scripts": {
  "dev": "webpack --mode=development --watch",
  "build": "webpack --mode=production"
},

命令行中可以指定mode参数值  --mode=development/production

--config 用来指定某个文件为配置文件 默认为根目录下的webpack.config.js
```

```js
// webpack.config.js
// 导出的必须是有效的node代码  不能使用es6模块化导出配置

```


## devtool

通过一些配置解决了在开发环境中看不到源代码的问题

> [devtool官网地址](https://www.webpackjs.com/configuration/devtool/)


## 编译过程


## 入口和出口

### 规则

1. name chunkname 用于解决多入口问题
2. hash 总的资源hash，通常用于解决缓存问题,通过更改资源hash值来更新浏览器缓存文件问题
3. chunkhash: 所属资源的hash
4. id 使用chunkid 不推荐 开发和生产环境不一致，开发环境是名字，生产环境是数字

```js
const path = require('path')

module.exports = {
  mode: 'development',
  // entry: './src/main.js', // 入口文件
  entry: {
    main: './src/index.js',
    a: './src/a.js',
    c: ['./src/a.js', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'target'), // 必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
    // filename: 'bundle.js' // 配置的合并的js文件的规则 默认为main.js
    filename: '[name]-[chunkhash:5].js' // 对应多个chunk，即多个入口  name会替换为对应的entry入口模块的名称
  },
  devtool: 'source-map'
}
```


### 最佳实践

1. 一个页面一个js

```js
// webpack配置
module.exports = {
  entry:{
    pageA: "./src/pageA/index.js",
    pageB: "./src/pageB/index.js",
    pageC: ["./src/pageC/main1.js", "./src/pageC/main2.js"]
  },
  output:{
    filename:"[name].[chunkhash:5].js"
  }
}
```

2. 一个页面多个js

```js
// webpack配置
// 这种方式适用于页面之间有一些独立、相同的功能，专门使用一个chunk抽离这部分js有利于浏览器更好的缓存这部分内容
// 如果使用多启动模式（数组形式），则会有增加传输量的问题
module.exports = {
  entry:{
    pageA: "./src/pageA/index.js",
    pageB: "./src/pageB/index.js",
    statistics: "./src/statistics/index.js"
  },
  output:{
    filename:"[name].[chunkhash:5].js"
  }
}
```

3. 单页应用

```js
// webpack配置
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash:5].js'
  }
}
```

## loader

**`./src/loaders`**

loader实际上就是将代码字符串转换为另一种代码字符串

loader会在读取文件内容之后进行解析，然后再生成AST抽象语法树

### 利用loader处理css

```js
// 为什么不直接使用document，而是采用字符串的形式，是因为此段代码在运行时执行，运行时并没有document
module.exports = function (sourceCode) {
  var code = `var style = document.createElement("style");
  style.innerHTML = \`${sourceCode}\`;
  document.head.appendChild(style);
  module.exports = \`${sourceCode}\``;
  return code;
}
```

### 利用loader处理图片

**`./src/loaders/img-loader.js`**


## plugin

用于监听事件，在不同的事件做不同的事情

compiler对象的钩子事件类型

```js
// ./src/plugins/test-plugin.js  line 15
// tap示例
compiler.hooks.done.tap('TestPlugin-done', function(compilation) {
  // 只要变化就会运行
  console.log('插件完成了！！！')
})

// 如果使用tapAsync则函数还有第二个参数，第二个参数是回调函数
compiler.hooks.done.tap('TestPlugin-done', function(compilation, callback) {
  callback()
})

```

这一部分使用的是 Tapable API，这个小型的库是一个专门用于钩子函数监听的库。

它提供了一些事件类型：

- tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
- tapAsync：注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
- tapPromise：注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束

### 利用plugin生成资源信息文档

**`生成文件：dist/fileList.md`**
**`使用插件：src/plugins/FileListPlugin.js`**

---

## 区分环境

区分开发环境和生产环境

1. 生成两个不同的配置文件 webpack.dev.js && webpack.pro.js, package.json文件中配置两个不同的打包命令指定这两个文件即可
2. webapck.config.js 可以返回一个函数根据env的值来判断环境

```js
// webpack.config.js
module.exports = env => {
  // env初始化时为undefined
  // 可通过package.json配置命令 --env.abc=3 来设置值，此时值就是 { abc: 3 }
  if(env && env.prod) {
    return {
      // 返回生产环境的配置
    }
  } else {
    return {
      // 返回开发环境的配置
    }
  } 
}

// package.json
"scripts": {
  "prod": "webpack --env.prod"
  "dev": "webpack"
}

// 或者直接使用命令 npx webpack --env.prod

// 如果运行生产环境的命令，此时配置文件中的env.prod有值且为true，则会使用生产环境的配置
```
