const fs = require('fs')
const path = require('path')
 
module.exports = class CleanWebpackPlugin {
  constructor() {
    this.outputPath = ''
  }
  apply(compiler) {
    if (!compiler.options.output || !compiler.options.output.path) {
      // eslint-disable-next-line no-console
      console.warn(
        'clean-webpack-plugin: options.output.path not defined. Plugin disabled...',
      );

      return;
    }

    const hooks = compiler.hooks;

    this.outputPath = compiler.options.output.path

    hooks.emit.tap('CleanWebpackPlugin', async compilation => {
      // const files = await fs.promises.readdir(this.outputPath)

      // async function handleDel(p, files) {
      //   for (let index = 0; index < files.length; index++) {
      //     const curPath = path.resolve(p, files[index])
      //     const stat = await fs.promises.stat(curPath)
      //     if(stat.isDirectory()) {
      //       let _files = await fs.promises.readdir(path.resolve(p, curPath))
      //       handleDel(curPath, _files)
      //     } else {
      //       await fs.promises.unlink(curPath)
      //     }
      //   }
      // }

      // handleDel(this.outputPath, files)
    })
  }
}