const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    home: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: 'scripts/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist'),
    // 公共路径，解决路径问题，打包后会拼接到资源路径最前面
    // 某些loader/plugin如果需要单独配置可以进行单独配置（如果支持的话）
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'home.html',
      chunks: ['home'] // 默认为 all，即所有的chunkname 指定的文件都会被引入
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'a.html',
      chunks: ['a'] // 默认为 all，即所有的chunkname 指定的文件都会被引入
    }),
    new CopyPlugin({
      patterns: [
        { from: './public', to: './' } // 每一个对象就是一个独立的复制规则，to代表复制到哪里，相对于output输出目录，默认为dist
      ]
    }),
    // 使用内置插件
    // 定义常量，一般全部大写形式，在生成文件资源后会将key替换为value
    new webpack.DefinePlugin({
      PI: `Math.PI`, // PI = Math.PI
      VERSION: `"1.0.0"`, // VERSION = "1.0.0"
      DOMAIN: JSON.stringify("duyi.com") // DOMAIN = "duyi.com"
    }),
    // 生成在打包文件后的头部，展示作者信息等
    new webpack.BannerPlugin({
      banner: `
        hash: [hash]
        chunkhash: [chunkhash]
        name: [name]
        author: dc
        corporation: none
      `
    }),
    // key可全局使用，而不必再次引入jquery和lodash
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   _: 'lodash'
    // })
  ],
  devServer: {
    port: 8000,
    open: true,
    proxy:{
      '/api': {
        target: '',
        changeOrigin: true // 更改请求头中的host和origin
      }
    }
  },
  stats: {
    modules: false, // 控制台不显示过多打包信息
    colors: true // 控制台显示信息，重要文字着色
  }
}