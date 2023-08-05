// 数组的扩展

// 展开运算符

// Array.from()
// 将类数组和可遍历的对象转换为真正的数组

// Array.of()
// 将一组值转换为数组 基本上可以用来替代Array和new Array

// 实例方法 copyWithin()
// 在当前数组内部，将指定位置的成员复制到其他位置（覆盖原有成员），然后返回当前数组。

// find -- 接收两个参数 第一个参数是回调函数（回调包含三个参数当前项，当前索引和原数组） 第二个参数用于绑定回调函数的this对象 找不到返回undefined，找到了返回当前项
// findIndex -- 与find类似，接收两个参数，找不到返回 -1 找到了返回当前索引
// findLast -- 反向查找
// findLastIndex -- 反向查找

// fill
// [1,2,3].fill(7, 1, 2)  -- [1,7,3]

// includes -- 第二个参数是搜索的起始位置

// flat -- [1, [2, 3, [4, 5]]].flat(2) // [1,2,3,4,5]
// flatMap -- [1,2,3,4,5].flatMap(x => [x * 2]) // [2,4,6,8,10]
// flatMap接收两个参数 第一个参数是回调函数（接收三个参数当前项 当前索引和原数组） 第二个参数用于绑定函数里的this对象

// at -- [1,2,3].at(2) - 3  [1,2,3].at(4) - undefined  [1,2,3].at(-1) - 3

// toReversed -- 对应reverse，颠倒数组成员的位置
// toSorted -- 对应sort，用来对数组成员排序
// toSpliced -- 对应splice
// with -- 对应splice(index, 1, value)

// 以上四个方法不改变原数组，而返回一个原数组的拷贝

// group -- 用于给数组成员进行分组 三个参数分别是当前项，当前索引和数组， 返回值是一个对象
[1,2,3].group((item, index, arr) => {
  return item % 2 === 0 ? 'even' : 'odd'
}) // { even: [2], odd: [1,3] }

// groupToMap -- 与group一致，唯一值的区别就是返回的map解构而不是对象
// 区别：按照对象分组就使用groupToMap，按照字符串分组就使用group


// 数组的空位
/**
 * forEach(), filter(), reduce(), every() 和some()都会跳过空位
 * map()会跳过空位，但会保留这个值
 * join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
 * Array.from(),扩展运算符，entries()、keys()、values()、find()和findIndex()，会将数组的空位，转为undefined
 * copyWithin会连空位一起拷贝
 * fill会将空位视为正常的数组位置
 * for of循环也会遍历空位
 */


// sort排序的稳定性 插入排序、合并排序、冒泡排序都是稳定的，堆排序、快速排序等是不稳定的

