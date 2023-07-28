// 解构赋值 -- 如果等号右边的值不是数组或者对象，就先将其转为对象，无法转换为对象的值都将报错

// 数组的解构赋值
// let [a, b, c] = [1, 2, 3] // a -- 1  b -- 2  c -- 3

// let [, , c] = [1, 2, 3] // c -- 3

// let [a, [b], d] = [1, [2, 3], 4] // 部分解构，a -- 1 b -- 2 d -- 4

// let [a, ...b] = [1,2,3,4,5,65] // a -- 1 b -- 2,3,4,5,65

// let [a] = [] // a -- undefined 没有解构到就是undefined

// 如果右边不是数组或者数组包装对象，那么就会报错

// Number Boolean NaN undefined null {}  TypeError: xxx is not iterable
// 如果是String类型的则可以解构出
// let [a, b] = 'cd' // a -- 'c'  b -- 'd'

// Set也可以解构
// let [a,b,c] = new Set([1,2,3]) // a -- 1 b -- 2 c -- 3

// 解构默认值 -- 只有当一个数组成员严格等于undefined，默认值才会生效

// let [a = 1] = [undefined] // a -- 1

// let [a = 1] = [null] // a -- null

// 也可以引用解构赋值的其他变量，但该变量必须已经声明
// let [x = 1, y = x] = [];     // x=1; y=1
// let [x = 1, y = x] = [2];    // x=2; y=2
// let [x = 1, y = x] = [1, 2]; // x=1; y=2
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined



// 对象的解构赋值

let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; // 实际赋值的是baz，foo只是在对象中找到同名属性 baz --- 'aaa'


// 连续解构
// let obj = {
//   p: [
//     'Hello',
//     { y: 'World' }
//   ]
// };

// let { p, p: [x, { y }] } = obj; // p -- [ 'Hello', { y: 'World' } ]  x -- Hello   y -- World


// 嵌套赋值
// let obj = {};
// let arr = [];

// ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true }); // obj -- { prop: 123 }  arr -- [true]

// // 对象的解构赋值可以取到继承的属性
// let obj2 = { a: 111 }
// Object.setPrototypeOf(obj, obj2)

// let { a } = obj // a -- 111

// 数组也可以进行对象属性的解构
let arr = [1,2,3]
let { 0: first, [arr.length - 1]: last } = arr // first -- 1 last -- 3

// map时对数组进行解构
let result = [[1,2], [3,4]].map(([x, y]) => x + y)
// console.log(result); // [3, 7]

// 函数参数也可以使用默认值
function move(x, y) {
  x = x || 0
  y = y || 0
  // console.log([x, y]);
  return [x, y]
  // console.log([x, y]);
}

move(3, 8); // [3, 8]
move(3); // [3, 0]
move(); // [0, 0]


