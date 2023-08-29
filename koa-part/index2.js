/**
 * 中间件学习
 * 
 * 静态资源读取
 * 路径改写
 */
const Koa = require('koa')
const path = require('path')

const koaStatic = require('./koa-static')

const app = new Koa()

app.use(koaStatic(path.resolve(__dirname, 'public')))
app.use(require('./koa-fallback'))

app.listen(9527, () => {
  console.log('server listening');
})
