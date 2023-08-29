// class
// class内部采用严格模式
// class不存在提升
{
  class test {
    // _x = 0  也可以直接在类内部顶层声明

    constructor(x) {
      this._x = 0
    }

    set x(value) {
      this._x = value
    }

    get x() {
      return this._x
    }
  }

  const t = new test()

  console.log(t.x); // 0
  t.x = 10
  console.log(t.x); // 10

  var descriptor = Object.getOwnPropertyDescriptor(
    test.prototype, "x"
  );

  console.log("get" in descriptor); // true
}


{
  // class表达式
  const myClass = class Me {
    getClassName() {
      return Me.name
    }
  }

  const m = new myClass()
  console.log(m.getClassName()); // Me

  // 如果类的内部没有用到name的话 可以直接省略 Me
  // const myClass = class {  }


  const person = new class {
    constructor(name) {
      this.name = name
    }

    sayName() {
      console.log(this.name);
    }
  }('张三')

  person.sayName() // 张三

  // person是一个立即执行的类的实例
}


{
  /**
   * 静态方法
   * 不会被实例继承，而是直接通过类来调用
   * 如果方法内部有this，则这个this指向类而不是实例
   * 静态方法可以与非静态方法重名
   * 父类的静态方法可以被子类继承
   * 静态方法也是可以从super对象上调用的
   */
  class Foo {
    static classMethod() {
      return 'hello'
    }
  }

  class FooChild extends Foo {
    static classMethod() {
      return super.classMethod() + ', world';
    }
  }

  console.log(Foo.classMethod()); // hello

  const foo = new Foo()
  // foo.classMethod() // TypeError: foo.classMethod is not a function

  // const fooC = new FooChild()
  console.log(FooChild.classMethod()); // hello, world

}


{
  /**
   * 静态属性
   * 
   */
  class Foo {
    static prop = 1
  }

  console.log(Foo.prop); // 1
}


{
  // 私有方法和私有属性 -- 只有在类的内部访问的方法和属性，外部不能访问
  // 前面加上 # 即可

  class FakeMath {
    static PI = 22 / 7
    static #totallyRandomNumber = 4

    // 静态私有方法，同样无法在外部调用
    static #computeRandomNumber() {
      return FakeMath.#totallyRandomNumber
    }

    // 通过静态方法返回静态私有方法，静态私有方法里面返回静态私有属性，可以访问静态私有属性的值
    // 不限于此种方式
    static random() {
      console.log('I heard you like random numbers…');
      return FakeMath.#computeRandomNumber()
    }
  }

  console.log(FakeMath.PI); // 3.142857142857143
  console.log(FakeMath.random()); // I heard you like random numbers…   4

  // console.log(FakeMath.#totallyRandomNumber); // SyntaxError: Private field '#totallyRandomNumber' must be declared in an enclosing class
  // console.log(FakeMath.#computeRandomNumber); // SyntaxError: Private field '#computeRandomNumber' must be declared in an enclosing class
}


{
  // in 运算符
  // 直接访问某个类不存在的私有属性会报错，但是访问不存在的公开属性不会报错
  // 这个特性可以用来判断,某个对象是否为类的实例
  class C {
    #brand;

    // static isC(obj) {
    //   if (#brand in obj) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }

  // in运算符对于Object.create()、Object.setPrototypeOf形成的继承，是无效的，因为这种继承不会传递私有属性
}


{
  // 静态块 -- 在类生成时运行且只运行一次,主要作用是对静态属性进行初始化
  class C {
    static x = 0;
    static y;
    static z;

    // static {
    //   try {

    //   } catch {
        
    //   }
    // }
  }
}


{
  // Generator方法
  class Foo {
    constructor(...args) {
      this.args = args
    }

    * [Symbol.iterator]() {
      for (const arg of this.args) {
        yield arg
      }
    }
  }

  for (const x of new Foo('hello', 'world')) {
    console.log(x);
  }
}

{
  // new.target用来判断是否通过new关键字来调用。返回当前class，构造函数使用new.target会返回当前构造函数
  // 子类继承父类时，new.target会返回子类
  class Point {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  }

  class ColorPoint extends Point {
    constructor(x, y, color) {
      // 调用类时会报错 ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
      // super之后才能使用this
      // this.color1 = color 
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
    }

    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }

  console.log(new ColorPoint(1, 2, 3));

  // super方法相等于执行一遍父类的构造器
  // 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错

  // 如果子类没有定义constructor方法，这个方法会默认添加
  class B {}
  // class A extends B {}
  // 等同于
  // class A extends B {
  //   constructor(...args) {
  //     super(...args)
  //   }
  // }

  // 实例对象同时是父类和子类的实例
}

{
  /**
   * 私有属性和私有方法的继承
   * 父类所有的属性和方法都会被子类继承，除了私有的属性和方法
   * 可以通过方法来读写父类的私有属性
   */
  class Foo {
    #p = 1000;
    #m() {
      console.log('hello');
    }

    getP() {
      return this.#p
    }
  }

  class Bar extends Foo {
    constructor() {
      super()
      // 下面两行会报错
      // console.log(this.#p);
      // this.#m()

      console.log(this.getP()); // 1000
    }
  }

  new Bar()
  
}


{
  // 静态属性和静态方法的继承 -- 父类的静态属性和静态方法也会被子类继承
  // 注意，静态属性是通过软拷贝实现继承的,改变值的时候会影响到父类的值
  class A {
    static hello() {
      console.log('hello world');
    }
  }

  class B extends A {}

  B.hello() // hello world
}


{
  // Object.getPrototypeOf() -- 用来从子类上获取父类
  class Point {}

  class ColorPoint extends Point {}

  console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
}


{
  // super关键字 -- 既可以当作函数使用，也可以当作对象使用
  
  // super作为对象，用在静态方法之中指向父类，在普通方法中指向父类的原型对象
  // 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
}


{
  // 类的prototype属性和__proto__属性
  /**
   * 子类的__proto__属性，表示构造函数的继承，总是指向父类
   * 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
   * 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说子类的原型的原型，是父类的原型
   */

  
}
