// 添加文件列表插件
module.exports = class FileListPlugin {
  constructor(filename = 'fileList.txt') {
    this.filename = filename
  }

  apply(compiler) {
    // emit钩子 -->  输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器
    compiler.hooks.emit.tap('FileListPlugin', compilation => {
      let fileList = []

      for (const key in compilation.assets) {
        let content = `【${key}】
大小：${compilation.assets[key].size() / 1000}KB`

        fileList.push(content)
      }

      let str = fileList.join('\n\n')

      /**
       * assets 即为打包后生成的资源列表，在生成资源前获取到资源信息并添加到fileList.txt文本中
       * 
       * 每个文件都有一个source方法和一个size方法
       */
      compilation.assets[this.filename] = {
        source() {
          return str
        },
        size() {
          return str.length
        }
      }
    })
  }
}
