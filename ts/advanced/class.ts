// 抽象类 不可以创建实例对象，只能让别的类继承
abstract class Chess {
  x: number = 0
  y: number = 0

  abstract name: string

  // 每次移动的判断都一致，只是具体的判断规则不一致
  // 比如马走日 象走田等规则
  // 就可以将规则函数作为抽象成员交由子类去实现
  // 这就是设计模式中的模板模式
  move(targetX: number, targetY: number): boolean {
    console.log('1.判断是否出界');
    console.log('2. 目标位置是否有己方棋子');

    // 3. 判断是否符合规则
    if (this.rule(targetX, targetY)) {
      this.x = targetX
      this.y = targetY
      console.log(`${this.name}移动成功`);
      return true
    }

    return false
  }

  abstract rule(targetX: number, targetY: number): boolean
}

class Horse extends Chess {
  // 实现父类成员name
  name: string = '马'

  rule(targetX: number, targetY: number): boolean {
    return true
  }
}

class Gun extends Chess {
  // 实现父类成员name
  get name() {
    return '炮'
  }

  rule(targetX: number, targetY: number): boolean {
    return true
  }
}

class Car extends Chess {
  // 实现父类成员name
  name: string
  constructor() {
    super()
    this.name = '车'
  }

  rule(targetX: number, targetY: number): boolean {
    return true
  }
}

// 无法创建抽象类的实例。ts(2511)
// const chesses = new Chess()








// 单例模式
class Board {
  // 构造器私有化后,就不能通过new关键字来创建实例对象
  private constructor() { }

  private static _board?: Board

  // 单例模式要通过静态方法去创建
  static createBoard(): Board {
    if (this._board) {
      return this._board
    }

    this._board = new Board()
    return this._board
  }
}

// 类“Board”的构造函数是私有的，仅可在类声明中访问。
// const b1 = new Board()

const b2 = Board.createBoard()
const b3 = Board.createBoard()

// 此时b2和b3相等
console.log(b2 === b3); // true




// 索引器
class Index {
  // 定义索引器，这时候如果输出未定义属性就可以使用了，因为prop定义了所有类型的属性
  [prop: string]: any
  constructor(
    public name: string,
    public age: number
  ) { }

  sayHello() { }
}

const i = new Index('zs', 18)

// 下面的输出会报错
// 元素隐式具有 "any" 类型，因为类型为 ""id"" 的表达式不能用于索引类型 "Index"。类型“Index”上不存在属性“id”。
console.log(i['id']);



class MyArray {
  [index: number]: string
  0 = 'asdfsd'
  1 = 'asdfsd'
  2 = 'xfbd'
}

const arr = new MyArray()
arr[4] = 'sdgsfd'

class B { }

class A {
  // 此时前后两种索引器的值的类型必须匹配
  // 也可以不一样，但是两种类型必须是后方的子类型或者相同类型
  // 例如将第一个索引器的值约束为类B，那么第二个索引器的类型也必须约束为B或者是B的父类型，例如object
  // 如果第一个的值约束为string，那么第二个也要约束为string或者string的父类型，例如object
  [prop: number]: string
  [prop: string]: string
}

const a = new A()
a[0] = 'gsdg'
a['asdgsd'] = 'gsdg'

console.log(a);



