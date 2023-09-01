const URL = require('url')

/**
 * 解析url
 */
const url = new URL.URL('https://www.baidu.com?a=3&b=2')

// 等同于 new URL.parse('xxx')

// URL {
//   href: 'https://www.baidu.com/?a=3&b=2',
//   origin: 'https://www.baidu.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'www.baidu.com',
//   hostname: 'www.baidu.com',
//   port: '',
//   pathname: '/',
//   search: '?a=3&b=2',
//   searchParams: URLSearchParams { 'a' => '3', 'b' => '2' },
//   hash: ''
// }
console.log(url);

console.log(url.searchParams.has('a')); // true
console.log(url.searchParams.get('b')); // 2



// 反向转换
const obj = {
  href: 'https://www.baidu.com/?a=3&b=2',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/',
  search: '?a=3&b=2',
  hash: ''
}

const urlFormat = URL.format(obj)
console.log(urlFormat); // https://www.baidu.com/?a=3&b=2

