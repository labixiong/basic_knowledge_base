/**
 * 开发一个字典类
 * 字典中会保存键值对的数据 
 * 
 * 字典中对键值对数据的操作
 * 1. 添加一个键值对
 * 2. 按照键，删除对应的键值对
 * 3. 循环每一个键值对
 * 4. 得到当前键值对的数量
 * 5. 判断某个键是否存在
 * 6. 重新设置某个键对应的值，如果不存在，则添加
 */

type Callback<K, V> = (key: K, val: V) => void

export class Dictionary<K, V> {
  // 保存所有的键
  private keys: K[] = [];
  // 保存所有的值
  private vals: V[] = [];

  // 设置值
  set(key: K, val: V) {
    const i = this.keys.indexOf(key)
    if (i < 0) {
      this.keys.push(key)
      this.vals.push(val)
    } else {
      this.vals[i] = val
    }
  }


  // 循环
  forEach(callback: Callback<K, V>) {
    this.keys.forEach((k, i) => {
      // 获取当前key所对应的值
      const v = this.vals[i]
      callback(k, v)
    })
  }

  // 判断某个键是否存在
  has(key: K) {
    return this.keys.includes(key)
  }


  // 删除某个键
  delete(key: K) {
    const i = this.keys.indexOf(key)
    if (i < 0) {
      return
    }

    this.keys.splice(i, 1)
    this.vals.splice(i, 1)
  }

  get size() {
    return this.keys.length
  }
}


const dic = new Dictionary<string, number>()

dic.set("a", 1)
dic.set("b", 2)
dic.set("a", 11)

dic.forEach((k, v) => {
  console.log(`${k}: ${v}`);
})

console.log(dic.has("c"));



