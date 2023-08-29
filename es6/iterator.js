// iterator

{
  /**
   * 作用
   * 1. 为各种数据结构，提供一个统一的，简便的访问接口
   * 2. 使得数据结构的成员能够按某种次序排列
   * 3. es6创造了一种新的遍历命令forof循环，iterator接口主要供forof使用
   */
}

{
  /**
   * 遍历过程
   * 1. 创建一个指针对象，指向当前数据结构的起始位置，也就是说，遍历器对象本质上就是一个指针对象
   * 2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
   * 3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
   * 4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置
   */
  const it = makeIterator(['a', 'b'])

  function makeIterator(arr) {
    let nextIdx = 0
    return {
      next: function() {
        return nextIdx < arr.length ? { value: arr[nextIdx++], done: false } : { value: undefined, done: true }
      }
    }
  }

  // 简写形式
  function makeIterator2(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++]} :
          {done: true};
      }
    };
  }

  // console.log(it.next()); // { value: 'a', done: false }
  // console.log(it.next()); // { value: 'b', done: false }
  // console.log(it.next()); // { value: undefined, done: true }
}

{
  /**
   * 原生具备Iterator接口的数据结构如下
   * Array Map Set String TypedArrat 函数的arguments对象 NodeList对象
   */

  // 数组的Symbol.iterator属性
  let arr = ['a', 'b', 'c']
  let it = arr[Symbol.iterator]()

  console.log(it.next()) // { value: 'a', done: false }
  console.log(it.next()); // { value: 'b', done: false }
  console.log(it.next()); // { value: 'c', done: false }
  console.log(it.next()); // { value: undefined, done: true }
}


{
  // 对于普通的对象 forin循环可以遍历键名,forof循环会报错
  // 方法1
  let obj = { a: 1, b: 2 }
  for (const key of Object.keys(obj)) {
    console.log(`${key} --> ${obj[key]}`);
  }

  function* entries(obj) {
    for (const key of Object.keys(obj)) {
      yield [key, obj[key]]
    }
  }

  for (const [key, value] of entries(obj)) {
    console.log(`${key} --> ${obj[key]}`);
  }

  // 输出结果一致
  // a --> 1
  // b --> 2
}

{
  // 数组遍历
  // forEach, 无法中途跳出循环,return和break都不能奏效


  // forin可以遍历数组的键名
  /**
   * 三个缺点
   * 1. 数组的键名是数字,但是forin循环是以字符串作为键名"0", "1", "2"等等
   * 2. forin循环不仅遍历数字键名,还会遍历手动添加的其他键,甚至包括原型上的键
   * 3. 某些情况下,forin循环会以任意顺序遍历键名
   * 
   * 总之: forin循环主要是为遍历对象而设计的,不适用于遍历数组
   */

  // forof 有着和forin一样的简洁语法,但没有forin那些缺点;不同于forEach方法,可以与break,continue,return配合使用;提供了遍历所有数据结构的统一操作接口
  // Set和Map可以直接使用forof循环
}
