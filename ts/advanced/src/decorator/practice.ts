import "reflect-metadata"

/**
 * 装饰器练习
 * 将一个类的名称和属性的名称以及值打印出来
 */
// type constructor2 = new (...args: any[]) => object

const key = Symbol.for("description")

function decorator(description: string) {
  return Reflect.metadata(key, description)
}

function printObj(obj: any) {
  const objPrototype = Object.getPrototypeOf(obj).constructor

  if (Reflect.hasMetadata(key, objPrototype)) {
    console.log(Reflect.getMetadata(key, objPrototype));
  } else {
    // 原型构造器的名字
    console.log(objPrototype.name)
    // console.log(obj.__proto__.constructor.name)
  }

  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      if (Reflect.hasMetadata(key, obj, k)) {
        console.log(`\t${Reflect.getMetadata(key, obj, k)}: ${obj[k]}`)
      } else {
        console.log(`\t${k}: ${obj[k]}`)
      }
    }
  }
}

@decorator("学生")
class Student {
  @decorator("用户名")
  loginId: string

  @decorator("密码")
  loginPwd: string
}

const ss = new Student()
ss.loginId = 'abc'
ss.loginPwd = '123'

printObj(ss)
