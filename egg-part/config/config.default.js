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

exports.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: '',
    db: 0,
  },
}

exports.cluster = {
  listen: {
    port: 7000,
  },
};

exports.$apiBase = 'http://study.yuanjin.tech'
