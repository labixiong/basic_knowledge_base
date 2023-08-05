// 对象的扩展

// 简写的对象方法不能用作构造函数
const obj = {
  f() {
    this.foo = 'bar'
  }
}

// new obj.f() // 报错 TypeError: obj.f is not a constructor


// 目前有四个操作会忽略可枚举性(enumerable)为false的属性
// forin Object.keys() JSON.stringify Object.assign(es6新增)


// 属性的遍历
let obj1 = { a: 1 }
Object.defineProperties(obj1, {
  b: {
    value: 2,
    enumerable: false,
    writable: true,
    configurable: true,

    get b() {
      return b
    },

    set b(newV) {
      this.b = newV // return newV 也可
    }
  }
})

obj1.b = 3

console.log(obj1.b);

for (const key in obj1) {
  if (Object.hasOwnProperty.call(obj1, key)) {
    const element = obj1[key];
    console.log(key, element);
  }
}

console.log(Object.keys(obj1), 'Object.keys(obj1)'); // ['a']

console.log(Object.getOwnPropertyNames(obj1)); // ['a', 'b']

console.log(Object.getOwnPropertySymbols(obj1)); // []

console.log(Reflect.ownKeys(obj1)); // ['a', 'b']

/**
 * 总结：
 * forin遍历自身和继承的可枚举属性（不含Symbol属性） 
 *  扩展：与forof区别：迭代方式 -- forin语句以任意顺序迭代对象的可枚举属性  forof语句遍历迭代对象定义要迭代的数据
 *              对于遍历数组来说，forin一般专注键名  forof一般专注值
 *              forof遍历数组和类数组 map array string 类数组之类  forin大部分用于遍历对象
 *              forof可以使用break continue return等跳出循环的操作，
 * 
 * Object.keys(obj1) -- 返回一个键名的数组，包含对象自身（不含继承的）所有可枚举属性（不含Symbol）的键名
 * 
 * Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
 * 
 * Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
 * 
 * Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
 */


// super -- 只能用在对象的方法之中，用在其他地方都会报错，目前只有对象的简写形式能让js引擎认识super

// 扩展运算符等同于使用Object.assign(),浅拷贝，并不会拷贝对象的原型

// 报错对象 AggregateError, 为了配合Promise.any方法

// try {
//   throw new AggregateError([
//     new Error("some error")
//   ], 'Hello');
// } catch (e) {
//   console.log(e instanceof AggregateError); // true
//   console.log(e.message);                   // "Hello"
//   console.log(e.name);                      // "AggregateError"
//   console.log(e.errors);                    // [ Error: "some error" ]
// }

// Error新增cause属性，写明报错原因 throw new Error(err, { cause: err })



// 对象的扩展方法
//  == 会自动转换数据类型 === NaN不等于自身 +0等于-0
// Object.is
console.log(Object.is('foo', 'foo')); // true
console.log(Object.is({}, {})); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

// es5通过以下代码部署is方法
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});


// Object.getOwnPropertyDescriptor() -- 返回某个对象属性的描述对象，主要为了解决Object.assign无法正确拷贝get属性和set属性的问题

console.log(Object.fromEntries([
  ["foo", "bar"],
  ["a", "123"],
  ["b"]
]));  // { foo: 'bar', a: '123', b: undefined }  

const map = new Map().set('foo', 'bar').set('a', '123')
console.log(Object.fromEntries(map)); // { foo: 'bar', a: '123' }

// Object.fromEntries(new URLSearchParams('foo=bar&baz=qux')) // 将查询字符串转换为对象 { foo: 'bar', baz: 'qux' }

// js对象的属性分成两种：自身的属性和继承的属性
// hasOwnProperty方法可以判断某个属性是否为原生属性  hasOwn也可以判断是否为自身的属性
obj.hasOwnProperty('foo')

Object.hasOwn(obj, 'foo')

// hasOwn对于不继承Object.prototype的对象不会报错，而hasOwnProperty是会报错的
