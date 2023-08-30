// egg创建好了app之后，如果存在此文件，并且是一个方法，则会自动执行该方法一次、

// 只能用下面这一种方式
module.exports = (app) => {
  app.locals = {
    globalTitle: '地区数据库'
  }
  app.axios = require('axios').default
}

// module.exports = {
//   axios: require('axios').default
// }

// exports.axios = require('axios').default
