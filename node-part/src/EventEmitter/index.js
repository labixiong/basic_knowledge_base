const Request = require('./request')

const request = new Request('http://duyi.ke.qq.com')

request.send()

request.on('res', (headers, body) => {
  console.log(headers);
  console.log(body);
})
