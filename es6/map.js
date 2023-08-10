// map
// js的对象结构本质上是键值对的集合（Hash结构），只接受字符串作为键名
// Map结构的键可以是各种类型的值

// Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题
// 如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

// 如果键是一个简单类型的键，则只要两个值严格相等，Map就将其视为同一个键，比如0和-0就是一个键 布尔值的true和string类型的true就不是一个
// 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

// 遍历  keys values entries forEach
const map = new Map([["F", "Foo"], ["T", "Tina"]])

// 遍历map.entries 等同于遍历map本身
for (const [key, value] of map.entries()) {
  console.log(key, value);
  // F Foo
  // T Tina
}

map[Symbol.iterator] === map.entries // true


// Map结构转为数组结构 
// 展开运算符
console.log([...map.values()]); // [ 'Foo', 'Tina' ]
console.log([...map.keys()]); // [ 'F', 'T' ]
console.log([...map.entries()]) // [ [ 'F', 'Foo' ], [ 'T', 'Tina' ] ]

// 数组转为map
let map1 = new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
console.log(map1); // Map(2) { true => 7, { foo: 3 } => [ 'abc' ] }

// map转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
console.log(strMapToObj(myMap)); // [Object: null prototype] { yes: true, no: false }
// { yes: true, no: false }


// 对象转为map
let obj = {"a":1, "b":2};
let map2 = new Map(Object.entries(obj));
console.log(map2); // Map(2) { 'a' => 1, 'b' => 2 }

// 转换函数
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})


// Map转为JSON - 分为两种情况，一种是Map的键名都是字符串，可以转为对象JSON，另一种是键名为非字符串，可以转为数组JSON
// 1. 
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap1 = new Map().set('yes', true).set('no', false);
strMapToJson(myMap1)
// '{"yes":true,"no":false}'

// 2.
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap2 = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap2)
// '[[true,7],[{"foo":3},["abc"]]]'

// JSON转为Map
// 正常情况下，所有键名都是字符串
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

// 特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
// 这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}



// WeakMap 只接受对象（null除外）和Symbol作为键名，键名所指向的对象，不计入垃圾回收机制
// WeakMap的设计目的在于, 有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用


