/**
 * typeof
 * 
 */
let a1: string = '413'
let b: typeof a1 = '235235'

class Func { }

// 传入的参数为一个构造函数
function createFunc(f: typeof Func) {
  return new f()
}


/**
 * keyof
 */

class U {
  loginId: string
  loginPwd: string
  age: number
}

// keyof U 返所有成员组成的联合类型
function createU(obj: U, prop: keyof U) {
  return obj[prop]
}

/**
 * in 常与keyof联用
 * 
 * 根据已有类型生成新的类型
 */
type String2<T> = {
  [p in keyof T]: T[p]
}

type ReadOnly<T> = {
  readonly [p in keyof T]: T[p]
}

type Partial2<T> = {
  [p in keyof T]?: T[p]
}

type Required2<T> = {
  [p in keyof T]-?: T[p]
}

// let func: () => number
type func = () => number

function sum(a: number, b: number) {
  return a + b
}

type returnType = ReturnType<func>


type twoParamsConstructor = new (arg1: any, arg2: any) => U

// 里面不写参数也不会报错是因为鸭子变型法，参数只能少不能多
// const u2 = class Test extends U {}

const u2: twoParamsConstructor = class Test extends U {
  loginId: string
  loginPwd: string
  age: number
  constructor(a: any, b: any) {
    super()
  }
}

// 这个时候如果想要得到 twoParamsConstructor 的返回值类型
// 就要使用 InstanceType<T>

type Inst = InstanceType<twoParamsConstructor>
