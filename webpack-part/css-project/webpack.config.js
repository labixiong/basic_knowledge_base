const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  devServer: {
    open: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', {
        loader: 'css-loader',
        options: {
          // 开启css module
          // modules: true,
          // 如果需要单配置自定义类名，需要将modules属性值修改为一个对象
          modules: {
            localIdentName: '[path][name][local]-[hash:5]'
          }
        }
      }] },
      { test: /\.png$/, use: 'file-loader' },
      { test: /\.less$/, use: ['style-loader', 'css-loader?modules', 'less-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}