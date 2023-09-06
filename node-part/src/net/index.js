const net = require('net')
const fs = require('fs')
const path = require('path')

/**
 * 创建客户端
 */


// {
//   // socket 是一个特殊的文件， 在node中表现为一个双工流对象
//   const socket = net.createConnection({
//     host: 'duyi.ke.qq.com', // 此处无需写协议
//     port: 80
//   }, () => {
//     // console.log('连接成功');
//   })

//   /**
//    * 提炼出响应字符串中的消息头和消息体
//    * @param {*} response 
//    */
//   function parseReponse(response) {
//     const index = response.indexOf("\r\n\r\n");
//     const head = response.substring(0, index);
//     const body = response.substring(index + 2);
//     const headParts = head.split("\r\n");
//     const headerArray = headParts.slice(1).map(str => {
//       return str.split(":").map(s => s.trim());
//     });
//     const header = headerArray.reduce((a, b) => {
//       a[b[0]] = b[1];
//       return a;
//     }, {});
//     return {
//       header,
//       body: body.trimStart()
//     };
//   }

//   // 判断响应是否完成
//   function isOver() {
//     const contentLength = +receive.header['Content-Length']
//     // 目前接收到的字节数
//     const curReceivedLength = Buffer.from(receive.body, 'utf-8').byteLength
//     return curReceivedLength > contentLength
//   }

//   let receive = null // 只有第一次的时候进行解析请求头、请求体

//   socket.on('data', chunk => {
//     const response = chunk.toString('utf-8')
//     if(!receive) {
//       // parseReponse(response)
//       // receive = parseReponse(response)
//       if(isOver()) {
//         socket.end()
//         return
//       }
//     }

//     receive.body += response;
//     if (isOver()) {
//       socket.end();
//       return;
//     }

//     // console.log('来自服务器的消息：');
//     socket.end() // 结束连接，触发close事件
//   })

//   // 服务器并未接收到任何请求，所以不会返回数据

//   /**
//    * 请求行
//    * 请求头
//    * 请求体 -- 空
//    */
//   socket.write(`
//   GET / HTTP/1.1
//   Host: duyi.ke.qq.com
//   Connection: keep-alive


//   `)

//   socket.on('close', () => {
//     // console.log('结束了');
//   })
// }


/**
 * 创建服务器
 */
{
  const server = net.createServer()

  server.listen(9527)

  // 监听事件
  server.on('listening', () => {
    console.log('server listen 9527');
  })

  // 当有客户端连接时，触发该事件，并产生一个socket对象
  server.on('connection', (socket) => {

    socket.on('data', async chunk => {
      const filename = path.resolve(__dirname, './avatar.jpg')
      const bodyBuffer = await fs.promises.readFile(filename)
      const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, 'utf-8')

      const result = Buffer.concat([headBuffer, bodyBuffer])
      socket.write(result)
      socket.end()
    })

    socket.on('end', () => {
      console.log('请求关闭了');
    })

  })
}