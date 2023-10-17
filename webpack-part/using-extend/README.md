# 常用扩展

## clean-webpack-plugin

> [npm链接](https://www.npmjs.com/package/clean-webpack-plugin)

打包后会生成文件资源，如果文件更改过后，文件的hash会更改又会生成新的文件资源，但是之前的文件资源不会删除，这时候需要手动删除

此插件就是用来自动删除之前无用文件资源
```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

## html-webpack-plugin

> [npm链接](https://www.npmjs.com/package/html-webpack-plugin)

自动生成页面

```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    home: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: 'scripts/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'] // 默认为 all，即所有的chunkname 指定的文件都会被引入
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'a.html',
      chunks: ['a'] // 默认为 all，即所有的chunkname 指定的文件都会被引入
    })
  ]
}
```

## copy-webpack-plugin

> [npm链接](https://www.npmjs.com/package/copy-webpack-plugin)

复制静态资源 将某一个资源原封不动的复制到另一个文件夹中

以某个html页面为模板生成打包后的页面，原页面中引入的静态资源（例如图片）复制不过去，或者打包会出错等

```js
// webpack.config.js line 28
new CopyPlugin({
  patterns: [
    { from: './public', to: './' } // 每一个对象就是一个独立的复制规则，to代表复制到哪里，相对于output输出目录，默认为dist
  ]
})
```


## 开发服务器 webpack-dev-server

> [npm链接](https://www.npmjs.com/package/webpack-dev-server)
> [配置](https://webpack.docschina.org/configuration/dev-server/)

## 解决路径问题

publicPath

## 内置插件

1. DefinePlugin

    全局常量定义插件，使用插件通常定义一些常量值

    ```js
    // webpack.config.js
    // 定义常量，一般全部大写形式，在生成文件资源后会将key替换为value
    new webpack.DefinePlugin({
      PI: `Math.PI`, // PI = Math.PI
      VERSION: `"1.0.0"`, // VERSION = "1.0.0"
      DOMAIN: JSON.stringify("duyi.com") // DOMAIN = "duyi.com"
    })
    ```
2. BannerPlugin

  可以为每个chunk生成的文件头部添加一行注释，一般用于作者、公司、版权等信息

    ```js
    // 打包后的文件头部展示作者信息等
    /*!
    * 
    *         hash: 7b87b82e5a56763da991
    *         chunkhash: 810ba5ae4ac9b0530fb3
    *         name: a
    *         author: dc
    *         corporation: none
    *
    */

    // webpack.config.js
    new webpack.BannerPlugin({
      banner: `
        hash: [hash]
        chunkhash: [chunkhash]
        name: [name]
        author: dc
        corporation: none
      `
    })
    ```
3. ProvidePlugin

自动加载模块，而不必到处import或require

    ```js
    // webpack.config.js
    // key可全局使用，而不必再次引入jquery和lodash
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   _: 'lodash'
    // })
    ```

