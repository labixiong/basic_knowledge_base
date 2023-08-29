// const Koa = require('koa')
// const app = new Koa()
// const http = require('http')

// const server = http.createServer(app.callback())
const PORT = 9527

// server.listen(PORT, () => {
//   console.log('server listening');
// })


const Koa = require('koa')
const app = new Koa()

app.use(function(ctx, next) {
  /**
   * ctx 内置对象
   * 1. res -- http模块内置对象
   * 2. req -- http模块内置对象
   * 3. request -- koa封装的请求对象，用于获取请求传递的信息
   *    - header headers method 均可重新赋值，让后面的中间件使用
   *    - url 包含path和query参数，也可被重新赋值
   *    - originalUrl 原始url
   *    - origin 包含协议、域名和端口号
   *    - href 完整的路径
   *    - path 路径，也可被重新赋值
   *    - querystring query参数，问号之后，不包含问号
   *    - search  query参数，问号之后，包含问号
   *    - hostname  主机名
   *    - query 将query参数解析成对象
   * 4. response -- koa封装的响应对象，用于设置响应信息
   *    - status 可设置 200
   *    - message 响应的状态消息 OK
   *    - body 响应主体 （string Buffer Stream Object||Array -- 自动JSON格式化 null）
   *    - 
   * 
   * 5. cookies
   *    app.keys = ['secret 1', 'secret 2'] -- 加密多个密钥
   *    ctx.cookies.set(name, value, { signed: true }) -- 设置加密的cookie
   *    ctx.cookies.get(name) -- 解密cookie
   * 
   * 6. 自定义空间 后续的中间件也可以拿到
   *    ctx.user = user 不建议
   *    ctx.state.user = user 正确
   * 
   * res和req不建议使用，除非是koa做不到的事情
   * 
   */

  app.emit('abc', 123)
  next()
})

// 注册自定义事件
app.on("abc", (data) => {
  console.log(data);
})

app.listen(PORT, () => {
  console.log('server listening');
})
