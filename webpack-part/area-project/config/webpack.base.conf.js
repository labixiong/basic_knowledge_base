const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    detail: './src/detail/index.js',
    list: './src/list/index.js'
  },
  output: {
    filename: 'scripts/[name].[chunkhash:5].js'
  },
  stats: {
    modules: false,
    colors: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/list.html',
      filename: 'list.html',
      chunks: ['list']
    }),
    new HtmlWebpackPlugin({
      template: './public/detail.html',
      filename: 'detail.html',
      chunks: ['detail']
    }),
    new CopyPlugin([
      { from: './public', to: './' }
    ])
  ]
}