module.exports = class TestPlugin {
  apply(compiler) {
    /**
     *  compiler对象产生于插件初始化时 不会重复创建
     *  为什么不重复创建对象，但却能监听到事件呢？实际上是注册事件，在apply方法内部注册事件，类似于window.onload
     * */

    /**
     * compiler.hooks.事件名称.事件类型(name, function(compilation) {}) 
     * 事件名称 -- https://www.webpackjs.com/api/compiler-hooks/ 左侧菜单皆是事件名称
     * 事件类型 -- 这一部分使用的是Tapable API，提供了一些事件类型 tap tapAsync tapPromise等
     * 
     * name 通常是插件名字
     */
    compiler.hooks.done.tap('TestPlugin-done', function(compilation) {
      // 只要变化就会运行
      console.log('插件完成了！！！')
    })

    // 如何在compilation上面注册事件？ 可以使用compiler对象的beforeRun钩子
    // compiler.hooks.beforeRun.tap('TestPlugin-done', function(compilation) {
    //   compilation.hooks.xxx.xxx
    // })


    // 下方console只会运行一次
    console.log('插件运行了!!!!');
  }
}