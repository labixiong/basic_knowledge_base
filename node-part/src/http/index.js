const http = require('http')
const URL = require('url')
const path = require('path')
const fs = require('fs')

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
  // function handleReq(req) {
  //   let body = ''
  //   req.on('data', chunk => {
  //     body += chunk.toString('utf-8')
  //   })

  //   req.on('end', () => {
  //     console.log('请求体', body);
  //   })
  // }

  // // 搭建服务器
  // const server = http.createServer((req, res) => {
  //   console.log(url.parse(req.url));

  //   handleReq(req)

  //   res.setHeader('a', '1')
  //   res.setHeader('b', '2')

  //   res.write('你好!')
  //   res.end()
  // })

  // server.listen(9527)

  // server.on('listening', () => {
  //   console.log('server listen 9527');
  // })
}


{
  // 静态服务器

  async function getStat(filename) {
    try {
      return await fs.promises.stat(filename)
    } catch (error) {
      return null
    }
  }

  async function getFileContent(url) {
    const urlObj = URL.parse(url)
    let filename

    filename = path.resolve(__dirname, '../../public', urlObj.pathname.substring(1))
    console.log(filename, 'filename');
    let stat = await getStat(filename)

    if(!stat) {
      // 如果文件不存在
      return null
    } else if(stat.isDirectory()) {
      // 文件是个目录 手动拼接上index.html
      filename = path.resolve(__dirname, '../../public', urlObj.pathname.substring(1), 'index.html')
      stat = await getStat(filename)

      if(!stat) {
        // 如果拼接上之后 还是找不到文件
        return null
      } else {
        // 如果文件内容过大 不建议直接返回
        return await fs.promises.readFile(filename)
      }
    } else {
      // 文件存在 且 不是目录
      return await fs.promises.readFile(filename)
    }
  }

  async function handler(req, res) {
    const info = await getFileContent(req.url)
    if(info) {
      res.write(info)
    } else {
      res.statusCode = 404
      res.write("Resource is not exist")
    }

    res.end()
  }

  const server = http.createServer(handler)

  server.on('listening', () => {
    console.log('server listen 6100');
  })

  server.listen(6100)
}
