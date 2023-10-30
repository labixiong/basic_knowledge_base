const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash:5].js',
    path: path.resolve(__dirname, 'target')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}