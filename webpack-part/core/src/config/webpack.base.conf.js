const path = require('path')

module.exports = {
  entry: './src/main.js', // 入口文件
  // entry: {
  //   main: './src/index.js',
  //   a: './src/a.js',
  //   c: ['./src/a.js', './src/index.js']
  // },
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
    // filename: 'bundle.js' // 配置的合并的js文件的规则 默认为main.js
    filename: '[name]-[chunkhash:5].js' // 对应多个chunk，即多个入口  name会替换为对应的entry入口模块的名称
  },
  // devtool: 'source-map',
}