const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, './myFiles/1.txt')
// readFile
/**
 * readFile(path, options, callback)
 * 
 * path <string> | <Buffer> | <URL> | <integer>
 * options <Object> | <string>
 * callback <Function>
 */
// fs.readFile(filename, 'utf-8', (err, content) => {
//   console.log(content);
// })

// 采用异步函数的方式获取
// fs.promises.readFile(filename, 'utf-8').then(res => {
//   console.log(res, 'res');
// })


// writeFile -- 没有文件会新建，如果没有目录会运行失败
async function write() {
  // await fs.promises.writeFile(filename, 'sfgergwgw11111', {
  //   flag: 'a' // append 追加内容 默认是覆盖内容
  // })

  // 写入流
  const buffer = Buffer.from('abcde', 'utf-8')
  await fs.promises.writeFile(filename, buffer)

  console.log('写入成功');
}

// write()


// copyFile -- fs.copyFile 复制文件
// 手写copy
async function copy() {
  const fromFilename = path.resolve(__dirname, './myFiles/test.jpg')
  const buffer = await fs.promises.readFile(fromFilename)
  const toFilename = path.resolve(__dirname, './myFiles/test.copy.jpg')
  await fs.promises.writeFile(toFilename, buffer)
  console.log('copy success!');
}

// copy()


// stat -- 返回文件的信息
async function stat() {
  const stat = await fs.promises.stat(filename)
  // Stats {
  //   dev: 2657630379,
  //   mode: 33206,
  //   nlink: 1,
  //   uid: 0,
  //   gid: 0,
  //   rdev: 0,
  //   blksize: 4096,
  //   ino: 562949956931159,
  //   size: 5,
  //   blocks: 0,
  //   atimeMs: 1693553138148.7324,
  //   mtimeMs: 1693553138007.5178,
  //   ctimeMs: 1693553138007.5178,
  //   birthtimeMs: 1693551811322.7974,
  //   atime: 2023-09-01T07:25:38.149Z,
  //   mtime: 2023-09-01T07:25:38.008Z,
  //   ctime: 2023-09-01T07:25:38.008Z,
  //   birthtime: 2023-09-01T07:03:31.323Z
  // }

  /**
   * size -- 占用字节
   * atime -- 上次访问时间
   * mtime -- 上次文件内容被修改时间
   * ctime -- 上次文件状态被修改时间
   * birthtime -- 文件创建时间
   * isDirectory() -- 判断是否是目录
   * isFile -- 判断是否是文件
   */
  console.log(stat);
  console.log('是否是目录：', stat.isDirectory()); // false
  console.log('是否是文件：', stat.isFile()); // true
}

// stat()


// readdir 获取文件夹中的子文件和子文件夹,获取不到子文件夹中的文件 返回值为文件名数组
async function readdir() {
  const pathes = await fs.promises.readdir(path.resolve(__dirname, './myFiles'))
  console.log(pathes); // [ '1.txt', 'sub', 'test.copy.jpg', 'test.jpg' ]
}

// readdir()


// mkdir 创建新目录
// 同时创建多个目录
const dirname = path.resolve(__dirname, './myFiles/1')
async function mkdir() {
  const dirArr = dirname.split(path.sep)
  for (let i = 1; i <= 5; i ++) {
    dirArr.splice(dirArr.length - 1, 1, i)
    await fs.promises.mkdir(dirArr.join(path.sep))
  }
}

// mkdir()



// 判断文件是否存在 isExists 只能使用fs.isExists

// 辅助函数
async function exists(filename) {
  try {
    await fs.promises.stat(filename)
    return true
  } catch (error) {
    if(error.code === 'ENOENT') {
      // 文件不存在
      return false
    }
    throw error
  }
}

let dirname2 = path.resolve(__dirname, './myFiles/6')

async function test() {
  const result = await exists(dirname2)
  if(result) {
    console.log('目录已存在，无需操作');
  } else {
    await fs.promises.mkdir(dirname2)
    console.log('目录创建成功');
  }
}

// test()


// 读取一个目录中的所有子目录和文件
/**
 * 1. 先获取文件
 * 2. 再获取文件内容
 */

class File {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename
    this.name = name
    this.ext = ext
    this.isFile = isFile
    this.size = size
    this.createTime = createTime
    this.updateTime = updateTime
  }

  // 获取文件内容
  async getContent(isBuffer = false) {
    if(this.isFile) {
      if(isBuffer) {
        return fs.promises.readFile(this.filename)
      } else {
        return fs.promises.readFile(this.filename, 'utf-8')
      }
    } else {
      return null
    }
  }

  // 获取子目录
  async getChildren() {
    if(this.isFile) {
      return []
    } else {
      let children = await fs.promises.readdir(this.filename)
      children = children.map(name => {
        const filename = path.resolve(this.filename, name)
        return File.getFile(filename)
      })
      return Promise.all(children)
    }
  }

  // 获取文件对象
  static async getFile(filename) {
    const stat = await fs.promises.stat(filename)
    const name = path.basename(filename)
    const ext = path.extname(filename)
    const isFile = stat.isFile()
    const size = stat.size
    const createTime = stat.ctime
    const updateTime = stat.mtime
    return new File(filename, name, ext, isFile, size, createTime, updateTime)
  }
}

async function readDir(dirname) {
  const file = await File.getFile(dirname)
  return await file.getChildren()
}

async function test() {
  const dirname = path.resolve(__dirname, './myFiles')
  const result = await readDir(dirname)
  console.log(result);
}

test()



// 删除文件
// fs.unlink(path)


