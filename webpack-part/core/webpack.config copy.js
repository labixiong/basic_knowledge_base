const path = require('path')
const FileListPlugin = require('./src/plugins/FileListPlugin')

module.exports = {
  mode: 'development',
  // entry: './src/main.js', // 入口文件
  // entry: {
  //   main: './src/index.js',
  //   a: './src/a.js',
  //   c: ['./src/a.js', './src/index.js']
  // },
  // output: {
  //   path: path.resolve(__dirname, 'target'), // 必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
  //   // filename: 'bundle.js' // 配置的合并的js文件的规则 默认为main.js
  //   filename: '[name]-[chunkhash:5].js' // 对应多个chunk，即多个入口  name会替换为对应的entry入口模块的名称
  // },
  // devtool: 'source-map',
  module: {
    // loader的执行顺序时从下往上，从右到左执行
    rules: [
      {
        test: /index\.js$/, //匹配的模块正则
        // use: [ //匹配到后应用的规则模块
        //   {  //其中一个规则
        //     loader: "./src/loaders/test-loader", //loader模块的路径，该字符串会被放置到require中
        //     options: {
        //       //向对应loader传递的额外参数,也可通过加载loader模块路径时进行query传参 例：loader: './loaders/test-loader?changeVar="未知数"'
        //       // 函数内部可通过this获取到参数
        //       changeVar: '未知数'
        //     }
        //   }
        // ]
        use: ["./src/loaders/test-loader"]
      },
      {
        test: /index\.js$/, //匹配的模块正则
        // use: [ //匹配到后应用的规则模块
        //   {  //其中一个规则
        //     loader: "./src/loaders/test-loader", //loader模块的路径，该字符串会被放置到require中
        //     options: {
        //       //向对应loader传递的额外参数,也可通过加载loader模块路径时进行query传参 例：loader: './loaders/test-loader?changeVar="未知数"'
        //       // 函数内部可通过this获取到参数
        //       changeVar: '未知数'
        //     }
        //   }
        // ]
        use: ["./src/loaders/loader1"]
      },
      {
        test: /\.(png)|(jpg)|(gif)$/,
        use: [
          {
            loader: './src/loaders/img-loader.js',
            options: {
              // 限制图片字节大小
              limit: 3000,
              filename: 'img-[contenthash:5].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FileListPlugin('fileList.md')
  ]
}