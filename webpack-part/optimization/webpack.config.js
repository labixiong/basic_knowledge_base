const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[hash:5].js'
  },
  stats: {
    colors: true,
    chunks: false,
    modules: false
  },
  optimization: {
    splitChunks: {
      // 分包配置

      // chunks值默认为async，需要更改为all，默认所有都要进行分包
      chunks: 'all',
      // 分包的最大大小 单位kb， 超过此设置的大小，会将此包再次重新分包
      // 分包的基础单位是模块，如果一个包分割过后还是超过了限制大小，不会再将此包进行分割
      maxSize: 60000,
      // 控制新chunk名称的分隔符，默认值为 ~
      automaticNameDelimiter: '.',
      // 一个模块被多少个chunk使用时，才会进行分包，默认值为1
      minChunks: 1,
      // 当分包达到多少字节后才允许被真正的拆分，默认值30000
      minSize: 30000
    }
  },
  // module: {
  //   noParse: /jquery/
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()

    // 下方代码为手动分包配置代码
    // new CleanWebpackPlugin({
    //   // 要清除的文件或目录，排除掉dll以及dll目录下的内容
    //   // globbing patterns语法 -- https://github.com/sindresorhus/globby#globbing-patterns
    //   cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"]
    // }),
    // // 引入资源清单文件
    // new webpack.DllReferencePlugin({
    //   manifest: require('./dll/jquery.manifest.json')
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('./dll/lodash.manifest.json')
    // })
  ]
}