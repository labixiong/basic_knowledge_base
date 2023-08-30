const Controller = require('egg').Controller

module.exports = class extends Controller {
  async index() {
    /**
     * 异步渲染
     * home 为view文件夹中的文件名
     * options：所需数据
     */
    // await this.ctx.render('home', { title: '首页 - 地区数据库' })

    // renderView方法 -- 与render使用一致，返回一个模板字符串，但不会直接给body赋值，需手动赋值
    // const html = await this.ctx.renderView('home', { title: '服务端渲染页面' })
    // this.ctx.body = html

    // renderString
    // const html = await this.ctx.renderString('标题：<%= title %>', { title: 'aaa' })
    // this.ctx.body = html



    // 采用中间件方式书写
    // const model = {
    //   user: this.ctx.state.user
    // }

    // const res2 = await this.app.axios.get(`${this.config.$apiBase}/api/local`)
    // model.provinces = res2.data

    // await this.ctx.render('home', { title: '首页', ...model })


    // 局部通用模型改造后
    // 会自动混入到model中，所以无需声明引入
    // 将服务层抽离改造后，数据获取放到app/service/local.js中  this.ctx.service.local.getProvinces() 等同于 this.service.local.getProvinces()
    const provinces = await this.service.local.getProvinces()
    const model = {
      title: '首页',
      provinces
    }

    await this.ctx.render('home', model)
  }

  async login() {
    this.ctx.body = "登录"
  }
}
