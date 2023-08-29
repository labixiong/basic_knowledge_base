// module
/**
 * CommonJS -- 用于服务器（运行时加载）  AMD -- 用于浏览器 ES Modules -- 通用
 * ES Modules -- 自动采用严格模式，编译时就完成加载
 */
{
  /**
   * 严格模式限制
   * 1. 变量必须声明后再使用
   * 2. 函数的参数不能有同名属性，否则报错
   * 3. 不能使用with语句
   * 4. 不能对只读属性赋值，否则报错
   * 5. 不能使用前缀 0 表示八进制数，否则报错
   * 6. 不能删除不可删除的属性，否则报错
   * 7. 不能删除变量delete prop, 会报错，只能删除属性delete global[prop]
   * 8. eval不会在它的外层作用域引入变量
   * 9. eval和arguments不能被重新赋值
   * 10. arguments不会自动反映函数参数的变化
   * 11. 不能使用arguments.callee arguments.caller
   * 12. 禁止this指向全局对象
   * 13. 不能使用fn.caller和fn.arguments获取函数调用的堆栈
   * 14. 增加了保留字（protected、static和interface等）
   */
}

{
  // import 标签具有提升功能，会提升到整个模块的头部，首先执行
  // 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构

  // import 'lodash'

  /**
   * 上面代码仅仅执行lodash模块，不输入任何值
   * 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
   * import和require可以写在同一模块里，但是尽量不要这么做
   */

  // import * as a from 'a' -- 整体加载 

  // 默认导出  默认引入
  // export { add as default  }
  // import { default as add } from 'add'
}


{
  // export import 复合写法
  // export { foo, bar } from 'module' -- 写成一行之后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar

  // 等同于
  // import { foo, bar } from 'module'
  // export { foo, bar }

  // 接口改名
  // export { foo as myFoo } from 'module'

  // 整体输出
  // export * from 'module'

  // 默认接口
  // export { default } from 'module'

  // 具名接口的默认写法
  // export { es6 as default } from 'module'
  // 等同于
  // import { es6 } from 'module'
  // export default es6

  // 同样地，默认接口也可以改名为具名接口
  // export { default as es6 } from 'module'


  // import * as foo from 'module'
  // 对应复合写法
  // export * as foo from 'module'
  // 等同于
  // import * as foo from 'module'
  // export { foo }
}


{
  // 模块之间也可以继承 
}

{
  /**
   * import() 动态加载, 返回一个Promise对象，可以用在任何地方，非模块的脚本也可以使用，运行时执行
   * import加载函数与所加载的模块没有静态连接关系，类似于nodejs的require方法，区别是import为异步加载，require为同步加载
   */

  // 1. 按需加载，在需要的时候进行加载
  // 2. 条件加载，可以放在if...else代码块中
  // 3. 动态的模块路径 import(f()) -- 根据f函数的执行结果来加载不同的模块
}


{
  /**
   * 注重点
   * 
   * 1. import函数加载模块成功之后，这个模块会作为一个对象，当作then方法的参数，因此可以使用对象解构的语法，获取输出接口
   * 2. 如果模块有default输出接口，可以用参数直接获得  import('./foo.js').then(res => res.default) / import('./foo.js').then(({ default: myFoo }) => myFoo)
   * 3. 同时加载多个模块可以使用Promise.all
   */
}


{
  // import.meta -- 返回当前模块的元信息，只能在模块内使用，模块外使用会报错
  // 返回一个对象,该对象的各种属性就是当前运行的脚本的元信息,具体包含哪些属性,标准没有规定

  // 1. import.meta.url -- 返回当前模块的URL路径,nodejs环境中返回的总是本地路径
  // 2. import.meta.scriptElement -- 浏览器特有的元属性，返回加载模块的那个script元素，返回加载模块的那个<script>元素，相当于document.currentScript属性
}

{
  /**
   * script标签 defer async属性
   * defer -- 要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行  渲染完执行
   * async -- 一旦下载完，渲染引擎就会中断渲染，执行完这个脚本以后，再执行渲染。 下载完就执行
   * 
   * 如果有多个defer，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的
   */

  // 浏览器加载es6模块，也是用script标签，但是要加入type="module"属性，等同默认打开了defer属性
  
}

{
  // es6模块与CommonJS模块的差异
  /**
   * 1. CommonJS模块输出的是一个值的拷贝，es6模块输出的是值得引用
   * 2. CommonJS模块是运行时架子啊，es6模块是编译时输出接口
   *    原因：CommonJS加载的是一个对象，该对象只有在脚本运行完才会生成；es6对接接口只是一种静态定义，在代码静态解析阶段就会生成
   * 3. CommonJS模块的require是同步加载模块，es6模块得import命令是异步加载，有一个独立得模块依赖的解析阶段
   */
}


{
  /**
   * 内部变量 -- es6模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。
   * 为了达到这个目的，nodejs规定es6模块之中不能使用CommonJS模块的特有的一些内部变量
   * 
   * 1. this -- es6模块中，顶层的this指向undefined，CommonJS模块的顶层this指向当前模块
   * 
   * 以下这些顶层变量在es6模块之中都是不存在的
   * 2. arguments
   * 3. require
   * 4. module
   * 5. exports
   * 6. __filename
   * 7. __dirname
   * 
   */
}
