// egg创建好了app之后，如果存在此文件，并且是一个方法，则会自动执行该方法一次、

// 只能用下面这一种方式
// module.exports = (app) => {
//   app.locals = {
//     globalTitle: '地区数据库'
//   }
//   // app.axios = require('axios').default
// }


// 使用生命周期形式书写
// 只会启动一次
module.exports = class {
  constructor(app) {
    this.app = app
  }

  // 1. 配置文件即将加载，这是最后动态修改配置的时机
  configWillLoad() {
    // 此时config文件已经被读取并合并，但还没生效
    // 此函数只支持同步调用
  }

  // 2. 文件加载完成
  async didLoad() {
    // 所有的配置已经加载完毕，函数可以是异步的
  }

  // 3. 插件启动完毕
  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未开启
    // 此时worker进程还没有开始工作
    // 可以做一些初始化的操作，这些操作成功才会启动应用
  }

  // 4. worker准备就绪
  async didReady() {
    // 多个worker进程已开启
    // 还没有监听端口,还不具备处理请求的能力
  }

  // 5. 应用启动完成
  async serverDidReady() {

  }

  // 6. 应用即将关闭
  async beforeClose() {

  }
}
