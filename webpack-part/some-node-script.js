const webpack = require('webpack')
const configuration = require('./webpack.config.js')

let compiler = webpack(configuration)

new webpack.ProgressPlugin().apply(compiler)

compiler.run(function (err, stats) {
  // ...
})
