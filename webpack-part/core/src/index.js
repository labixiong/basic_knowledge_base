// const a = require('./a')
// console.log('index module');
// console.log(a);

// const b = null
// console.log(b.abc());

// loader
// 未知数 a = 1

// loader处理图片
const src = require('./assets/webpack.png')
const img = document.createElement('img')
img.src = src
document.body.appendChild(img)