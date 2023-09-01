const path = require('path')

/**
 * 第一个参数如果带了后缀名则输出文件带后缀名  a.html
 * 如果不带后缀名则直接输出文件名 a
 * 
 * 如果有第二个参数
 * 后缀名第二个参数一致，则直接输出文件名，不带后缀名
 * 不一致则完整输出文件名和后缀名
 */
const basename = path.basename('aggre/gergesrg/a.js', '.html')
console.log(basename);

console.log(path.sep); // \

console.log(process.env.PATH.split(path.delimiter));
