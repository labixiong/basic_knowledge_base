// TS中的this
const user = {
  name: 'zs',
  age: 18,
  sayHello() {
    console.log(this.age, this.name);
  }
}

const s = user.sayHello
s()


// 需要书写接口来约定this的指向
interface IUser {
  name: string
  age: number
  // 将this作为函数的第一个参数，来绑定this的指向
  // 但是实际并不是参数，如果需要传入参数，依次写入即可 sayHello(this: IUser, xxx, yyy): void
  sayHello(this: IUser): void
}

const user2: IUser = {
  name: 'zs',
  age: 18,
  sayHello() {
    console.log(this, this.name, this.age);
  }
}

const say = user2.sayHello

// 此时下方代码就会报错 类型为“void”的 "this" 上下文不能分配给类型为“IUser”的方法的 "this"。
// say()



// 使用类的方式
class User {
  constructor(
    public name: string,
    public age: number
  ) { }

  // 强约束,将this的值约束为类
  sayHello(this: User) {
    console.log(this, this.name, this.age);
  }
}

const u = new User('zs', 18)
const say2 = u.sayHello

// 此时代码不会报错，因为允许这样的调用方式，但是调用后会this指向全局，输出this.name和this.age会变成undefined undefined
// 一般不会采用此种方式进行调用,但是以防万一,可以在类中函数定义时就采用强约束
// 将this作为第一个参数,并将this的值约束为类即可
// 强约束后，下方代码就会提示错误 类型为“void”的 "this" 上下文不能分配给类型为“User”的方法的 "this"。
// say2()
