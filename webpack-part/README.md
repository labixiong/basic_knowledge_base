# webpack

### 浏览器兼容性

webpack支持所有符合es5标准的浏览器(不支持ie8以下的版本).webpack的import和require.ensure需要Promise,如果你想要支持旧版本浏览器,在使用这些表达式之前,还需要提前加载polyfil

### 环境

Webpack 5 运行于 Node.js v10.13.0+ 的版本。

---

### loader

> 用于对模块的源代码进行转换，loader可以使你在import或load模块时预处理文件

#### 使用loader

1. 配置方式：在webpack.config.js文件中指定loader

  ```js
    // 执行顺序从右到左，从下到上
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              { loader: 'sass-loader' },
            ],
          },
        ],
      },
    };
  ```
2. [内联方式](https://webpack.docschina.org/concepts/loaders/#inline)：在每个import语句中显示指定loader

#### loader特性

- 支持链式调用，链中的每个loader会将转换应用在已处理过的资源上。一组链式的loader将按照相反顺序执行。上一个loader将其处理后的结果传递给下一个loader
- 可以是同步的，也可以是异步的
- 运行在nodejs中，并且能够执行任何操作
- 可以通过options对象配置
- 除了常见的通过package.json的main来将一个npm模块导出为loader，还可以在module.rules中使用loader字段直接引用一个模块
- 插件（plugin）可以为loader带来更多特性
- loader能够产生额外的任意文件

可以通过loader的预处理函数，为js生态提供更多能力

[编写一个loader](https://webpack.docschina.org/contribute/writing-a-loader/)

### plugin

> 一个具有apply方法的js对象，apply方法会被webpack compiler调用，并且在整个编译生命周期都可以访问compiler对象

### Configuration

>

