# egg

## 特点
1. 整合了后端技术，提供一站式开发体验
2. 制定了一套规范，统一了开发模式
3. 提供了各种插件，据类灵活的扩展能力
4. 约定优于配置
5. 内置多进程管理
6. 使用MVC模式

## 应用场景
- 中间服务器
- 纯后端服务器

## 创建egg工程
1. 使用egg脚手架
2. 手动搭建

```shell
npm i egg # 安装egg核心库
npm i -D egg-bin # 安装egg命令行工具
```

## 路由匹配

客户端 --> 服务器 --> egg路由匹配 --> 创建controller对象 --> 运行action --> 响应返回给客户端

## 路由较多？

不建议使用新建文件来区分router，可通过在router.js文件中新建router map来区分模块

## 控制器在子目录？

```js
// controller --> sub --> home --> index方法

// 以下两种方法读取都可
router.get('/', 'sub.home.index')
router.get('/', app.controller.sub.home.index)
```

## RESTful风格的URL定义

router提供了resources函数，用于定义RESTful风格的api接口

```js
router.resources('blogs', '/b', controller.blog)
```

上面一句代码的结果类似于

```js
router.get('blogs', '/b/', controller.blog.index)
router.get('new_blog', '/b/new', controller.blog.new)
router.get('blog', '/b/:id', controller.blog.show)
router.get('edit_blog', '/b/:id/edit', controller.blog.edit)
router.post('blogs', '/b', controller.blog.create)
router.put('blog', '/b/:id', controller.blog.update)
router.delete('blog', '/b/:id', controller.blog.destory)
```


## Controller和action

大部分情况下，对某个资源的处理，就对应一个Controller

在egg中，对Controller的要求如下
- 必须写到app/controller文件夹中
- 基类继承自Controller的类（非必填，但建议这样做）
- 文件名就是Controller的名称

当匹配到某个Controller，同时匹配到某个action时，egg会：
1. 创建Controller实例
2. 调用对应的action方法

## 静态资源

默认情况下，app/public目录为静态资源目录，请求路径`/public/*`中 * 位置对应的请求将被映射到app/public目录

egg之所以能够映射静态资源，是因为在内部使用了插件egg-static


## 插件

1. 命名 egg插件命名规范为 egg-*
2. 使用
```js
// /config/plugin.js

// 第一种写法
module.exports = {
  static: {
    // static -- 插件本身的名字
    enable: true, // 内置插件默认启用，第三方插件默认关闭
    package: 'egg-static', // 包名
    path: 插件的绝对路径，与package配置互斥
  }
}

// 第二种写法
exports.static = {
  enable: true,
  package: 'egg-static'
}

// 第三种写法
exports.static = true

```
3. 配置
`config/plugin.js`只是控制插件的启用和关闭，对于插件的配置需要在`config/config.default.js`中完成

这样做的逻辑理念是：集中配置，集中管理

不同的插件有不同的配置，需要阅读插件的官方文档

```js
exports.static = {
  // egg-static的配置
}
```


## 中间服务器

- 常见职责
 
代替传统后端服务器，托管静态资源，动态渲染页面，提供少量api访问

托管单页应用程序的静态资源，提供各种数据api

## 模板引擎

如果要使用传统的方式进行服务端渲染，就需要用到模板引擎

egg内置了插件egg-view，它本身不是模板引擎，但它可以对不同的模板引擎统一配置、统一处理

需要安装具体的模板引擎引擎插件，完成模板引擎的启用

### 安装

egg-view支持多种模板引擎，用的较多的是egg-view-nunjucks和egg-view-ejs

```shell
npm install egg-view-ejs
```

### 启用模板引擎插件

```js
// config/plugin.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
}

// config/config.default.js
exports.view = {
  // root: '', // 渲染的文件所在目录，默认是app/view/*
  // cache: true, // 默认开启缓存 
  mapping: {
    '.ejs': 'ejs',
    '.html': 'ejs',
  },
  defaultViewEngine: 'ejs', // 如果mapping找不到对应的模板引擎，将使用该值作为默认的模板引擎
  defaultExtension: '.ejs' // 后续在controller中渲染模板时，默认渲染模板的后缀名
}
```

### 渲染页面

配置好模板引擎后，即可在`app/view`中书写各种模板

当某个请求到达后，如果需要经过模板渲染页面，只需要在action中使用对应代码即可

```js
render(name, model) // 渲染模板文件，并赋值给body
renderView(name, model) // 渲染模板文件，不会赋值给body
renderString(tpl, model) // 渲染模板字符串，不会赋值给body
```

此时已经形成完整的MVC模式  Model(数据源) View（视图，模板文件） Controller（控制器，将数据赋值给模板操作）

## 编写中间件

### 全局中间件

```js
// app/middleware/mymid.js
module.exports = (options, app) => {
  return async function (ctx, next) {
    console.log('中间件开始', options);
    await next()
    console.log('中间件结束', options);
  }
}


// config/config.default.js
// 导出所有中间件
exports.middleware = ['mymid']

// 单独配置某个中间件
exports.mymid = {
  enable: true, // 通用配置，默认为true
  match: <string | regExp | function>,
  ignore: <string | regExp | function>,
  a: 1,
  b: 2
}
```

enable\match\ignore 为通用配置，每个中间件都有

enable: boolean 是否启用中间件

match和ignore -- 分别标识匹配和忽略，它们均支持多种类型的配置方式
- 字符串：配置的是一个url的路径前缀，所有以配置的字符串作为前缀的url都会匹配上。也可以直接使用字符串数组
- 正则：当参数为正则时，直接匹配满足正则验证的url的路径
- 函数：会将请求上下文传递给这个函数，最终取函数返回的结果（true/false）来判断是否匹配


### 路由中间件

```js
// app/router.js
module.exports = app => {
  const { router } = app
  const verifyToken = app.middleware.verifyToken({}, app)

  router.get('/', verifyToken, xxx, yyy, 'home.index') // 路由中间件可以写多个，依次写入即可
  router.get('/login', 'user.login')
  router.post('/login', 'user.handleLogin')
}
```

### 内置中间件

egg提供了一些内置的中间件，可通过app.config.coreMiddlewares查看

这些内置中间件将会和自定义的中间件配置合并，最终形成一个真正的中间件函数数组：app.middleware,真正起作用的是该数组中的函数

```js
// 内置中间件输出结果
[
  'meta',
  'siteFile',
  'notfound',
  'static',
  'bodyParser',
  'overrideMethod',
  'session',
  'securities',
  'i18n',
  'eggLoaderTrace'
]
```

## 通用模型提取

### 全局通用模型

配置在app.js文件中，添加到app.locals对象中
```js
// app.js
module.exports = (app) => {
  app.locals = {
    globalTitle: '地区数据库'
  }
  app.axios = require('axios').default
}

// app/view/common/header.ejs
<title><%= title %> - <%= globalTitle %></title>
```

### 上下文通用模型

放到ctx.locals中，通常在中间件中设置

### 局部模型

一般在具体的action中设置


## 三层架构 + MVC

### 三层架构


## 环境配置

### 两种配置方式

1. 通过`config/env`文件指定 -- 不推荐，服务器部署之后还要改动这个文件
2. 推荐通过`EGG_SERVER_ENV`环境变量指定运行环境更加方便，比如在生产环境启动应用：
```js
EGG_SERVER_ENV = prod npm start
```

### 获取运行环境

提供变量 `app.config.env` 来表示应用当前的运行环境

若没有指定 `config/env` 文件，同时也没有指定 `EGG_SERVER_ENV` 环境变量，`app.config.env`的值由 `NODE_ENV` 确定

- NODE_ENV没有设置或者设置了识别不出的值，那么`EGG_SERVER_ENV`为local  -- 本地开发环境
- NODE_ENV值为test，那么`EGG_SERVER_ENV`为unittest  -- 单元测试
- NODE_ENV值为production，那么`EGG_SERVER_ENV`为prod  -- 生产环境


### 针对环境的配置

```
config
|- config.default.js
|- config.prod.js
|- config.unittest.js
|- config.local.js
```

config.default.js 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件

当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置

```js
// config/config.default.js
exports.cluster = {
  listen: {
    port: 7001,
  },
};

// config/config.prod.js
exports.cluster = {
  listen: {
    port: 5000,
  },
};
```

支持自定义环境变量,配置相应的config文件即可
```js
// package.json
{
	"scripts":{
		"dev": "EGG_SERVER_ENV=yuanjin egg-bin dev"
	}
}

// config/config.yuanjin.js
exports.cluster = {
  listen: {
    port: 6000,
  },
};
```
