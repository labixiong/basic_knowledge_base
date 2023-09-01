# nodejs

## 概述

### 什么是nodejs

1. nodejs是一个js的运行环境
2. 它比浏览器拥有更多的能力

### 用node干什么

1. 开发桌面应用程序
2. 开发服务器应用程序 -- 作为中间层,轻量级的数据存储

---

## 全局对象 - global

1. setTimeout
  
    在浏览器环境中，setTimeout返回值是一个数字。
    在node环境中，返回值是一个对象
2. setInterval

    在浏览器环境中，setInterval返回值是一个数字。
    在node环境中，返回值是一个对象
3. setImmediate 

    类似于setTimeout，第二个参数值为0
4. console
5. __dirname

    获取当前模块所在的目录
    并非global属性
6. __filename

    获取当前模块的文件路径
    并非global属性
7. Buffer
8. process

    - cwd() 返回当前nodejs进程的工作目录，绝对路径
    - exit(code) 强制退出当前node进程，可以传退出码，为0的话，表示没有错误，传1表示有错误
    - argv String[] 获取命令中的所有参数
    - platform 获取当前的操作系统
    - kill(pid) 结束pid的进程
    - env Object 获取操作系统的环境变量

---

## 模块化细节

### 模块的查找

- 绝对路径 根据绝对路径直接加载模块
- 相对路径 ./ ../  

  相对于当前模块，之后转为绝对路径，再进行加载模块
- 相对路径

  检查是否是内置模块（fs、path等），再检查当前目录中的node_modules，再检查上级目录中的node_modules，转换为绝对路径再加载模块
- 关于后缀名

  可以不提供后缀名，会进行自动补全 js > json > node > mjs
- 关于文件名

  如果仅提供目录。不提供文件名，则自动寻找该目录中的index.js文件

  package.json中的main字段，表示包的默认入口，导入或执行包时若仅提供目录，则使用main补全入口，默认值为index.js

### module对象 记录当前模块的信息

### require

### 当执行一个模块或使用require时，会将模块放置再一个函数环境中

```js
// require加载模块原理（伪代码）
function require(modulePath) {
  // 1. 首先会考虑modulePath是否是内置模块等等，但是最终会转换为一个绝对路径
  let absoultePath = require.resolve(modulePath)
  // 2. 判断当前的modulePath是否已经被缓存
  if(require.cache[absoultePath]) {
    return require.cache[absoultePath].result
  }
  // 3. 如果没有缓存则继续加载当前模块的内容
  // 4. 将文件内容包裹在一个函数中
  function _temp(module, exports, require, __dirname, __filename) {
    // 这就是为什么可以直接使用__dirname和__filename
    console.log(__filename)
    console.log(__dirname)
    exports.c = 3
    module.exports = {
      a: 1,
      b: 2
    }
    this.m = 5
  }

  // 6. 创建module对象
  module.exports = {}
  const exports = module.exports

  _temp.call(module.exports, module, exports, require, module.id, module.filename)

  // 7.
  return module.exports
}

require.cache = {}

require.resolve = function(modulePath) {
  return absolutePath
}

// 模块内容
console.log(__filename)
console.log(__dirname)
exports.c = 3
module.exports = {
  a: 1,
  b: 2
}
this.m = 5

// 输出
{ a: 1, b: 2 }

// 如果不将module.exports重新赋值的话
module.exports.a = 1
module.exports.b = 2

// 则输出
{ a: 1, b: 2, c: 3, m: 5 }

// 而此时 this与module.exports与exports三个相等
```

---

## node中的ES模块化

nodejs自v13.2.0版本之后也开始支持ES Modules，同时兼容早期的commonjs规范，但不建议同时使用或穿插使用

---

## 基本内置模块

### os

跟操作系统相关的信息

- EOL -- 一行结束的分割符
- arch() -- 获取cpu的架构名
- cpus -- 获取cpu的核数
- freemem() -- 空闲内存，返回字节
- homedir() -- 用户目录
- hostname() -- 主机名
- tmpdir() -- 操作系统的临时目录

### path

- basename -- 返回文件名和后缀名，不会检查文件是否存在
    ```js
    /**
     * 第一个参数如果带了后缀名则输出文件带后缀名  a.html
    * 如果不带后缀名则直接输出文件名 a
    * 
    * 如果有第二个参数
    * 后缀名第二个参数一致，则直接输出文件名，不带后缀名
    * 不一致则完整输出文件名和后缀名
    */
    const basename = path.basename('aggre/gergesrg/a.js', '.html')
    console.log(basename); // a.js
    ```
- sep -- 同个模块下的分隔符  windows: \
- delimiter -- 不同模块之间的分隔符 
    ```js
    // 如果path.delimiter更改为具体的 ；，等字符，那么在不同的系统下会出错
    // 但是path.delimiter会根据不同系统返回不同的分隔符
    console.log(process.env.PATH.split(path.delimiter));
    ```
- dirname -- 获取文件路径
  ```js
    console.log(path.dirname('a/b/c/d.js')) // a/b/c
    console.log(path.dirname('a/b/c/d')) // a/b/c
  ```
- extname -- 获取后缀名
  ```js
    console.log(path.extname('a/b/c/d.js')) // .js
    console.log(path.extname('a/b/c/d')) // 空字符串
  ```
- join
  ```js
  let fullpath = path.join('a', 'b', 'c.js')
  console.log(fullpath) // a\b\c.js

  let basePath = 'a/b'
  fullpath = path.join(basePath, '../', 'c.js')
  console.log(fullpath) // a\c.js
  ```

- normalize
  ```js
  path.normalize('foo/bar/baz/..') // foo/bar
  ```
- relative -- 第二个参数路径相对于第一个参数路径的相对路径
  ```js
  path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb') 
  // ../../impl/bbb
  ```
- resolve -- 相对于process.cwd()的绝对路径
  ```js
    path.resolve('./a.js')

    // 如果要相对于当前模块，可以添加__dirname
    path.resolve(__dirname, './a.js')
  ```


### url

做字符串处理

- 解析url字符串
  ```js
    const URL = require('url')

    /**
    * 解析url
    */
    const url = new URL.URL('https://www.baidu.com?a=3&b=2')

    // 等同于 new URL.parse('xxx')

    // URL {
    //   href: 'https://www.baidu.com/?a=3&b=2',
    //   origin: 'https://www.baidu.com',
    //   protocol: 'https:',
    //   username: '',
    //   password: '',
    //   host: 'www.baidu.com',
    //   hostname: 'www.baidu.com',
    //   port: '',
    //   pathname: '/',
    //   search: '?a=3&b=2',
    //   searchParams: URLSearchParams { 'a' => '3', 'b' => '2' },
    //   hash: ''
    // }
    console.log(url);

    console.log(url.searchParams.has('a')); // true
    console.log(url.searchParams.get('b')); // 2


    // 反向转换
    const obj = {
      href: 'https://www.baidu.com/?a=3&b=2',
      origin: 'https://www.baidu.com',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'www.baidu.com',
      hostname: 'www.baidu.com',
      port: '',
      pathname: '/',
      search: '?a=3&b=2',
      hash: ''
    }

    const urlFormat = URL.format(obj)
    console.log(urlFormat); // https://www.baidu.com/?a=3&b=2


    // 快速获取路径参数的方法 -- 并转换为对象
    Object.fromEntries(new URLSearchParams(location.href.split('?')[1]))
  ```

### util

- callbackify -- 将异步函数改为回调函数的形式
- promisify -- 将回调函数改为异步函数
- isDeepStrictEqual -- 深度严格相等

---

## 文件I/O

对外部设备（磁盘、网卡、显卡、打印机等）的输入输出

IO的速度往往低于内存和CPU的交互速度

- fs模块 -- src/file/index.js


