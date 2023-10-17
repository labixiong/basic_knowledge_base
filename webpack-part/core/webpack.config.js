const baseConfig = require('./src/config/webpack.base.conf')
const prodConfig = require('./src/config/webpack.prod.conf')
const devConfig = require('./src/config/webpack.dev.conf')

module.exports = env => {
  if (env && env.prod) {
    return {
      ...baseConfig,
      ...prodConfig
    }
  } else {
    return {
      ...baseConfig,
      ...devConfig
    }
  }
}
