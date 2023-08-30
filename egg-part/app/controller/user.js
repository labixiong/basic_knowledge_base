const Controller = require('egg').Controller

module.exports = class extends Controller {
  async login() {
    // console.log(this.app.config.coreMiddlewares);
    const model = {
      title: '登录',
      error: '',
      loginId: ''
    }
    await this.ctx.render('login', model)
  }

  async handleLogin() {
    /**
     * 可以使用app自带的curl方法进行请求，但不太好用
     * 还是使用axios，在根目录app.js文件中配置到app中，使用方便
     */
    // this.app.curl()

    // config可以获取到 config/config.default.js文件中导出的所有配置
    // const url = `${this.config.$apiBase}/api/user/login`
    // const res = await this.app.axios.post(url, this.ctx.request.body)
    // if(res.data.code) {
    //   const model = {
    //     title: '登录',
    //     error: res.data.message,
    //     loginId: this.ctx.request.body.loginId
    //   }
    //   await this.ctx.render('login', model)
    // } else {
    //   const token = res.headers.authorization
    //   this.ctx.cookies.set('token', token)
    //   this.ctx.redirect('/')
    // }


    // 抽离逻辑之后，将接口请求放到service/user.js文件中
    const { loginId, loginPwd } = this.ctx.request.body
    const res = await this.service.user.login(loginId, loginPwd)
    if(res) {
      this.ctx.cookies.set('token', res.token)
      this.ctx.redirect('/')
    } else {
      const model = {
        title: '登录',
        error: '账号或密码不正确',
        loginId
      }
      await this.ctx.render('login', model)
    }
  }
}
