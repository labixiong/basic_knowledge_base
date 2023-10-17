const baseConf = require('./config/webpack.base.conf')
const prodConf = require('./config/webpack.prod.conf')
const devConf = require('./config/webpack.dev.conf')

module.exports = function (env) {
  if(env && env.prod) {
    const config = {
      ...baseConf,
      ...prodConf
    }

    config.plugins = [...baseConf.plugins, ...prodConf.plugins]

    return config
  } else {
    return {
      ...baseConf,
      ...devConf
    }
  }
}
