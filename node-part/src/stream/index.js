const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, './files/1.txt')

/**
 * 创建可读流
 */
const rs = fs.createReadStream(filename, {
  // start: '',
  // end: '',
  encoding: 'utf-8',
  highWaterMark: 1, // 1个字符  如果encodeing不指定默认为null 那么此字段值代表字节
  autoClose: true // 默认为true
})

// rs.on('open', () => {
//   console.log('文件被打开了')
// })

// rs.on('error', () => {
//   console.log('读取出错了');
// })

// rs.on('close', () => {
//   console.log('文件关闭');
// })

// // 每次读的时候都会触发  每次读多少取决于 highWaterMark 定义的值
// rs.on('data', (chunk) => {
//   console.log('读到一部分数据', chunk);
//   rs.pause()
// })

// rs.on('pause', () => {
//   console.log('暂停了');
//   setTimeout(() => {
//     rs.resume()
//   })
// })

// rs.on('resume', () => {
//   console.log('开始');
// })

// rs.on('end', () => {
//   console.log('文件读取结束');
// })


/**
 * 创建写入流
 */
const ws = fs.createWriteStream(filename, {
  flags: 'a',
  encoding: 'utf-8',
  highWaterMark: 3 // 每次最多写入字节数
})
 
/**
 * 写入一组数据 data可以是字符串或者buffer 返回一个boolean值 当写入队列清空时，会触发drain事件
 * 返回如果为true时，说明写入通道没有被填满，接下来的数据可以直接写入，无需排队
 * false 写入通道目前已被填满，接下来的数据将进入写入队列
 */
// let result = ws.write('a')

let i = 0
function write() {
  let flag = true
  while(i < 1024 * 1024 * 5 && flag) {
    ws.write('a')
    i ++
  }
}

// write()

// 每次队列中只能有 highWaterMark 字段值的长度
// 当写入队列长度为3时，会触发drain事件，然后可以再次写入
// ws.on('drain', () => {
//   console.log('可以再次写入了');
//   write()
// })

// 当写完的时候，调用end方法，表示不需要再写入了，会自动关闭文件
// 自动关闭文件的前提是配置里 autoClose为true -- 默认为true，如果为false就要手动调用close方法
// data是可选的，表示关闭前的最后一次写入
// ws.end(data)


/**
 * 读取文件到另一个文件中
 * 1. 用readFile方法读取文件内容，写入到另一个文件中
 *    缺点：占用内存较高
 * 2. 用读写流
 *    节省内存空间，并节约时间
 */

// 第一个方法
async function method1() {
  const filename1 = path.resolve(__dirname, './files/1.txt')
  const toFile = await fs.promises.readFile(filename1)
  console.time('方式1')
  const filename2 = path.resolve(__dirname, './files/2.txt')
  await fs.promises.writeFile(filename2, toFile)
  console.timeEnd('方式1') // 3.288ms
  console.log('写入完成');
}

// method1()

// 第二个方法
function method2() {
  const filename1 = path.resolve(__dirname, './files/1.txt')
  const filename2 = path.resolve(__dirname, './files/2.txt')

  // 采用默认值
  const rs = fs.createReadStream(filename1)
  const ws = fs.createWriteStream(filename2)
  console.time('方式2')

  // 下方操作代码等同于 pipe函数, 返回值就是ws,可以解决写入时的背压问题
  rs.pipe(ws)

  // rs.on('data', (chunk) => {
  //   // 读取内容
  //   let flag = ws.write(chunk)
  //   // 如果不能写入，则暂停读取数据
  //   // 等待队列中的数据写入完毕
  //   if(!flag) {
  //     rs.pause()
  //   }
  // })

  // ws.on('drain', () => {
  //   // 队列清空时,重新读取数据
  //   rs.resume()
  // })

  // // 读取结束
  // rs.on('close', () => {
  //   // 这时候写入流也结束, 默认自动关闭文件
  //   ws.end()
  //   console.timeEnd('方式2') // 12ms
  //   console.log('写入完毕');
  // })
}

// method2()
