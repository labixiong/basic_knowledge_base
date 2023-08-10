// set

// 还可以用于字符串去重
console.log([...new Set('aabbcc')].join('')); // abc

// 内部不会进行类型转换 数字类型的5和字符串类型的5是不一样的
// 类似于全等 === 运算符，主要的区别就是Set认为NaN等于自身

// 另外两个对象总是不相等的
console.log(new Set([NaN, NaN])); // Set(1) { NaN }
console.log(NaN === NaN); // false

let set = new Set()

let result = set.add(1).add(2)
console.log(result); // Set(2) { 1, 2 }

console.log(set.delete(1)); // true
console.log(set.has(2)); // true
console.log(set.clear()); // 清除所有成员 没有返回值
console.log(set); // Set(0) {}


// Array.from可以将Set结构转为数组
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
console.log(array);

// 遍历操作  keys vaues  entries forEach
// keys和values结果一致，两种方法可以直接用forof替代
// 扩展运算符内部使用forof

//同步改变原来的Set结构
// 1. 
let set1 = new Set([1,2,3])
set1 = new Set([...set1].map(val => val * 2))

// 2.
let set2 = new Set([1,2,3])
set2 = new Set(Array.from(set2, val => val * 2))
console.log(set1, set2); // Set(3) { 2, 4, 6 } Set(3) { 2, 4, 6 }


// WeakSet -- 也是不重复的值的集合
// 与Set两点区别 -- 成员只能是对象和Symbol值；对象都是弱引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
