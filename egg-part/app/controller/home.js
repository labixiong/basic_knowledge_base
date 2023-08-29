const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello World'
  }

  async login() {
    this.ctx.body = "登录"
  }
}

module.exports = HomeController
