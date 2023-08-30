// module.exports = app => {
//   // router实际就是koa-router
//   // controller会读取controller文件夹内容，返回一个对象 controller: { home: { index: fn } }
//   const { router, controller } = app
//   // router.get('/', controller.home.index)
//   router.get('/', "home.index") // 字符串写法等同于对象写法controller.home.index

//   // 配置路由时，可以给路由取一个合适的名称，将来可能会有用
//   // router.get('userdetail', '/user/:id', 'user.info')

//   // 路由重定向
//   router.get('/login', 'home.login')
//   router.redirect('/sign-in', '/login')

//   // /sign-in路由不进行重定向也可，新添加路由即可
//   router.get('/signed-in', 'home.login')
// }

// 划分多个模块，并不提倡新建文件来区分模块，最好是在router文件中操作
// 通过新建router mapper来划分模块
const mapper = {}

mapper.mapUser = function(app) {
  const { router } = app
  const prefix = '/api/user'
  router.post(`${prefix}/login`, 'user.login')
  router.post(`${prefix}/reg`, 'user.reg')
  router.get(`${prefix}/:id`, 'user.info')
}

mapper.mapNews = function(app) {
  const { router } = app
  const prefix = '/api/news'
  router.post(`${prefix}/`, 'news.all')
  router.post(`${prefix}/:id`, 'news.one')
}

// 也可以直接在mapper中进行配置，在进行注册
// const mapper1 = {
//   '/api/user': {
//     method: 'get',
//     path: '/login',
//     controller: 'user.login'
//   }
// }

// module.exports = app => {
  // 第一种方式进行注册
  // Object.values(mapper).forEach(m => m(app))
// }


// RESTful
module.exports = app => {
  const { router } = app
  const verifyToken = app.middleware.verifyToken({}, app)

  // router.resources('blogs', '/b', 'blog')
  router.get('/', verifyToken, 'home.index')
  router.get('/login', 'user.login')
  router.post('/login', 'user.handleLogin')
}
