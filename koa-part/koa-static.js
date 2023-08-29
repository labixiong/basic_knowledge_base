/**
 * 1. 得到文件内容 -- 借助fs模块，获取文件内容，前提是要有文件名和文件路径
 *    三种情况 -- 利用fs.promises.stat(filename) 判断文件状态
 *    - 是目录：添加上index.html重新查找
 *    - 是文件：直接返回文件名
 *    - 不存在，返回null
 */
const fs = require('fs')
const path = require('path')
const mime = require('mime')

async function getFileName(urlPath, root) {
  const subPath = urlPath.substr(1)
  const filename = path.resolve(root, subPath)
  try {
    const stat = await fs.promises.stat(filename)
    if(stat.isDirectory()) {
      // 是目录
      const newUrlPath = path.join(urlPath, 'index.html')
      return await getFileName(newUrlPath, root)
    } else {
      // 是文件
      return filename
    }
  } catch (error) {
    // 不存在
    return null
  }
}

module.exports = function(root) {
  return async function(ctx, next) {
    if(ctx.method !== 'GET') {
      await next()
      return
    }

    const filename = await getFileName(ctx.path, root)

    if(!filename) {
      await next()
      return
    }

    // 读取文件内容
    ctx.body = fs.createReadStream(filename)
    // 设置文件类型
    ctx.type = mime.getType(filename)
  }
}