var loaderUtils = require('loader-utils')

function loader(buffer) {
  // loaderUtils获取不到options所以内部又声明了一次
  const limit = 1000, filename = "img-[contenthash:5].[ext]"
  let content;
  
  if(limit >= 3000) {
    // 使用base64方式
    content = getBase64(buffer)
  } else {
    // 使用文件形式
    content = getFilePath.call(this, buffer, filename)
  }
  
  return `module.exports = \`${content}\``
}

loader.raw = true // 该loader要处理的是原始数据，此时sourceCode是buffer（即二进制数据）

module.exports = loader

// 使用base64方式
function getBase64(buffer) {
  // image/png要根据图片后缀来判断
  return 'data:image/png;base64,' + buffer.toString('base64')
}

// 使用文件的方式
function getFilePath(buffer, name) {
  // interpolateName 根据某种规则生成一个名称
  const filename = loaderUtils.interpolateName(this, name, {
    content: buffer
  })

  this.emitFile(filename, buffer)
  return filename
}
