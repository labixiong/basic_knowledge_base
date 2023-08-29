# koa

## 与express差异
1. koa支持异步
2. express必须调用send方法才可发送数据，如果没有send方法将卡住，send方法内部会调用end方法，结束协助流
3. 响应流程 当给body赋值时，koa会将status自动赋值为200或204，koa各个中间件中body共享，并且不需要调用其他方法就可发送数据


## 静态资源服务器中间件

## 常用中间件

| koa中间件 | 功能 |
| -- | -- |
| @koa-router | 官方中间件，借鉴了`koa-router`用于处理路由的中间件，用法类似`express.Router` |
| koa-bodyparser | 解析请求体的中间件，支持x-www-form-urlencoded,application/json格式的请求体 |
| koa-views | 渲染模块引擎的中间件，一般用于传统的服务端渲染 |
| koa-static | 用于搭建静态资源服务器的中间件 |
| koa-static-cache | 实现了http缓存的静态资源中间件 |
| koa-session | session中间件 |
| koa-jwt | 支持jwt的中间件 |
| koa-compress | 支持gzip动态压缩的中间件 |
| koa-logger | 日志记录中间件 |
| @koa/cors | 官方中间件，支持CORS跨域的中间件 |
| @koa/multer | 官方中间件，借鉴了`koa-multer`用户处理文件上传的中间件 |
| koa-connect | 将express或connect中间件转换为koa中间件 |
| http-proxy-middleware | 代理中间件 |
| connect-history-api-fallback | 单页应用支持 |
| koa-convert | 用于将旧版本的koa中间件转换为koa2中间件 |