console.log('rgertert');

// 函数约束
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }

  throw new Error('两个参数类型需一致')
}


// 枚举
// 修改一处地方即可
enum Gender {
  male = '男',
  female = '女'
}

let gender: Gender

gender = Gender.male
gender = Gender.female


// 枚举位运算
enum Permission {
  Read = 1,   // 0001
  Write = 2,  // 0010
  Create = 4, // 0100
  Delete = 8  // 1000
}

//1. 如何组合权限
//使用或运算
//0001
//或 只要有一个为真就是真
//0010
//0011
let p: Permission = Permission.Read | Permission.Write;

//2. 如何判断是否拥有某个权限
//0011
//且 两个都为真就是真
//0010
//0010
function hasPermission(target: Permission, per: Permission) {
  return (target & per) === per;
}
//判断变量p是否拥有可读权限

//3. 如何删除某个权限
//0011
//异或 两个相同就取0 两个不相同就取1
//0010
//0001
p = p ^ Permission.Write;
console.log(hasPermission(p, Permission.Write))

type Obj = {
  name: string
}
const obj: Obj = {
  name: 'Bob'
}

// obj.name = 'Bob'

// 接口 用于约束类、对象、函数的契约（标准）

// 约束对象
interface User {
  readonly id: string // 只读属性，不可重新赋值
  name: string
  age: number
  sayHello: () => void
}

let u: User = {
  id: 'ewfsg',
  name: 'zs',
  age: 18,
  sayHello: function () {
    console.log(this.name);
  }
}



// 约束函数
// interface A {
//   T1: string
// }

// interface B {
//   T2: number
// }

// interface C extends A, B {
//   T3: boolean
// }

type A = {
  T1: string
}

type B = {
  T2: number
}

type C = {
  T3: boolean
} & A & B

const obj2: C = {
  T1: '111',
  T2: 31,
  T3: true
}


// 类型兼容性
interface Duck {
  sound: '嘎嘎嘎'
  swim: () => void
}

let person = {
  name: '伪装成鸭子的人',
  sound: '嘎嘎嘎' as '嘎嘎嘎', // 强行将string类型断言为嘎嘎嘎类型
  age: 11,
  swim() {
    console.log(this.name + '正在游泳并发出了' + this.sound + '的声音');
  }
}

// 将person对象赋值给Duck类型的duck对象
// 是因为person里面有swim和sound属性
let duck: Duck = person

// 但是如果将person的对象直接赋值给duck变量的时候,会进行报错
let duck2: Duck = {
  sound: '嘎嘎嘎',
  swim() {
    console.log('发出了' + this.sound + '的声音');
  }
}
