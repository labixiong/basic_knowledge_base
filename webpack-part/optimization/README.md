# 性能优化

## 概述

- 构建性能

这里所说的是开发阶段的构建性能,而不是生产环境

优化的目标,是降低从打包开始,到代码效果呈现所经过的时间

构建性能会影响开发效率. 构建性能越高，开发过程中时间的浪费越少

- 传输性能

传输性能是指，打包后的JS代码传输到浏览器经过的时间

在优化传输性能时要考虑到：

1. 总传输量：所有需要传输的JS文件的内容加起来，就是总传输量，重复代码越少，总传输量越少
2. 文件数量：当访问页面时，需要传输的JS文件数量，文件数量越多，http请求越多，响应速度越慢
3. 浏览器缓存：JS文件会被浏览器缓存，被缓存的文件不会再进行传输


- 运行性能

运行性能是指，JS代码在浏览器端的运行速度

它主要取决于我们如何书写高性能的代码

**永远不要过早的关注于性能**，因为你在开发的时候，无法完全预知最终的运行性能，过早的关注性能会极大的降低开发效率


性能优化主要从上面三个维度入手

---

## 减少模块解析

1. 什么叫做模块解析?

![](assets/parse.png)

模块解析包含: 抽象语法树分析, 依赖分析, 模块语法替换

2. 不做模块解析会怎样?

![](assets/noParse.png)


如果某个模块不做解析，该模块经过loader处理后的代码就是最终代码。

如果没有loader对该模块进行处理，该模块的源码就是最终打包结果的代码。

如果不对某个模块进行解析，可以缩短构建时间

3. 哪些模块不需要解析

模块中无其他依赖：一些已经打包好的第三方库，比如jquery

4. 如何让某个模块不要解析？

配置`module.noParse`，它是一个正则，被正则匹配到的模块不会解析


## 优化loader性能

1. 缩小loader范围 include exclude
2. 缓存loader处理结果 cache-loader
3. 为loader开启多线程，借助nodejs中的os库，主要用到`thread-loader`

## 热替换

只更改修改的代码，大幅度提升开发效率

在devServer对象中配置hot为true即可开启

## 手动分包

如果依赖关系比较复杂 不建议使用

1. 概念

  将一个整体的代码，分布到不同的打包文件中

2. 为什么要分包？

  减少公共代码，降低总体积，特别是一些大型的第三方库，充分利用浏览器缓存

3. 什么时候要分包？

  多个chunk引入了公共模块，公共模块体积较大或较少的变动

4. 如何分包？

  手动分包、自动分包

```js
// webpack.config.js
module.exports = {
  ...,
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin({
      // 要清除的文件或目录，排除掉dll以及dll目录下的内容
      // globbing patterns语法 -- https://github.com/sindresorhus/globby#globbing-patterns
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"]
    }),
    // 引入资源清单文件
    new webpack.DllReferencePlugin({
      manifest: require('./dll/jquery.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./dll/lodash.manifest.json')
    })
  ]
}



// webpack.dll.config.js
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    jquery: ["jquery"],
    lodash: ["lodash"]
  },
  output: {
    filename: "dll/[name].js",
    library: "[name]" // 每个bundle暴露的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "dll", "[name].manifest.json"), 
      name: "[name]"
    })
  ]
};


// 打包后的结果 dll文件夹中的js文件 需要引入到html页面当中，否则会报错
```


## 自动分包

```js
// webpack.config.js
module.exports = {
  ...,
  optimization: {
    splitChunks: {
      // 分包配置
      chunks: 'all',
      // 分包的最大大小 单位kb， 超过此设置的大小，会将此包再次重新分包
      // 分包的基础单位是模块，如果一个包分割过后还是超过了限制大小，不会再将此包进行分割
      maxSize: 60000,
      // 控制新chunk名称的分隔符，默认值为 ~
      automaticNameDelimiter: '.',
      // 一个模块被多少个chunk使用时，才会进行分包，默认值为1
      minChunks: 1,
      // 当分包达到多少字节后才允许被真正的拆分，默认值30000
      minSize: 30000,
      // 缓存组策略
      cacheGroups: {
        // 分包css
        styles: {
          minSize: 0,
          test: /\.css$/,
          minChunks: 2
        }
      }
    }
  },
}
```

## 代码压缩

单模块体积优化，跟分包不冲突

UglifyJs 不支持es6+语法，流行度有所下降

Terser 支持es6语法，webpack内置 生产环境下自动开启代码压缩

## tree shaking


## 懒加载

