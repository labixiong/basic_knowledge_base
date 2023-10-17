const loaderUtils = require('loader-utils')

module.exports = function(sourceCode) {
  // 运行loader时，会生成一个上下文
  // const options = loaderUtils.getOptions(this)
  // console.log(options, 'options');
  // const reg = new RegExp(options.changeVar, 'g')
  const reg = new RegExp(/未知数/, 'g')
  return sourceCode.replace(reg, 'var')
}