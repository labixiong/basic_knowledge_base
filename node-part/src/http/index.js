const http = require('http')
const url = require('url')

{
  // 客户端请求
  // const request = http.request('http://yuanjin.tech:5005/api/movie', {
  //   method: 'GET',
  // }, res => {
  //   console.log('响应状态码', res.statusCode);
  //   console.log('响应头', res.headers);

  //   let result = ''
  //   res.on('data', chunk => {
  //     result += chunk.toString('utf-8')
  //   })

  //   res.on('end', () => {
  //     console.log(JSON.parse(result));
  //   })
  // })

  // request.end()
}


{
  // 处理请求
  function handleReq(req) {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString('utf-8')
    })

    req.on('end', () => {
      console.log('请求体', body);
    })
  }

  // 搭建服务器
  const server = http.createServer((req, res) => {
    console.log(url.parse(req.url));

    handleReq(req)

    res.setHeader('a', '1')
    res.setHeader('b', '2')

    res.write('你好!')
    res.end()
  })

  server.listen(9527)

  server.on('listening', () => {
    console.log('server listen 9527');
  })
}
