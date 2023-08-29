const Koa = require('koa')
const app = new Koa()
const { createProxyMiddleware } = require('http-proxy-middleware')
const c2k = require('koa-connect')

app.use(require('./routes/user'))

// http-proxy-middleware -- 代理中间件
// koa-connect -- 将express或connect中间件转换为koa中间件
app.use(c2k(createProxyMiddleware('/api', {
  target: 'http://yuanjin.tech:5100'
})))

app.listen(9527, () => {
  console.log('server listening');
})
