const path = require('path')

exports.keys = 'duyi.com'

exports.view = {
  // root: '', // 渲染的文件所在目录，默认是app/view/*
  // cache: true, // 默认开启缓存 
  mapping: {
    '.ejs': 'ejs',
    '.html': 'ejs',
  },
  defaultViewEngine: 'ejs', // 如果mapping找不到对应的模板引擎，将使用该值作为默认的模板引擎
  defaultExtension: '.ejs' // 后续在controller中渲染模板时，默认渲染模板的后缀名
}

exports.security = {
  csrf: {
    enable: false
  }
}

// 所有的中间件配置
exports.middleware = ['mymid']

// 针对某一个中间件进行配置
exports.mymid = {
  enable: true,
  // ignore: '/login', // 路由为login时不会运行该中间件
  match: '/login',
  a: 1,
  b: 2
}

// exports.redis = {
//   client: {
//     port: 6379,          // Redis port
//     host: '127.0.0.1',   // Redis host
//     password: '',
//     db: 0,
//   },
// }

exports.cluster = {
  listen: {
    port: 7000,
  },
};

exports.logger = {
  // 配置日志文件的目录
  dir: path.resolve(__dirname, '../logs'),
  // 配置不同类别的日志对应的文件名
  appLogName: 'duyi-app-web.log',
  coreLogName: 'egg-web.log',
  agentLogName: 'egg-agent.log',
  errorLogName: 'common-error.log',
  // 配置哪些级别及其以上的日志要被记录到日志文件，设置为NONE则会关闭日志记录，默认为 INFO
  level: 'DEBUG', 
  // 配置哪些级别及其以上的日志要被打印到控制台，设置为NONE则会关闭日志记录，默认为 INFO
  consoleLevel: 'DEBUG',
  // 配置日志文件的编码，默认为 utf-8
  // encoding: 'gbk',
  // 是否使用json格式记录日志，默认为false
  outputJSON: true,
}

// 配置文件
// 配置自定义日志类别
exports.customLogger = {
    myLogger: { // 属性名为类别名称
      file: path.resolve(__dirname, "../logs/my-logger.log"), // 配置日志文件
      // 配置哪些级别及其以上的日志要被记录到日志文件，设置为NONE则会关闭日志记录，默认为 INFO
      level: 'DEBUG', 
      // 配置哪些级别及其以上的日志要被打印到控制台，设置为NONE则会关闭日志记录，默认为 INFO
      consoleLevel: 'DEBUG',
      // 配置日志文件的编码，默认为 utf-8
      encoding: 'gbk',
      // 是否使用json格式记录日志，默认为false
      outputJSON: true,
      // app logger
      formatter(meta) {
          return `[${meta.date}] ${meta.message}`;
      },
      // ctx logger
      contextFormatter(meta) {
      	return `[${meta.date}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    }
}

exports.$apiBase = 'http://study.yuanjin.tech'
