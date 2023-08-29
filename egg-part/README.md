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
