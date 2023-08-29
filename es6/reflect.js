// Reflect
{
  // 1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
  // 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法

  // 2. 修改某些Object方法的返回结果，让其变得更合理。
  // 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

  // 3. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj 和delete obj[name] 
  // 而Reflect.has(obj, name) 和Reflect.deleteProperty(obj,name)让他它们变成了函数行为

  // 4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法,
  //    这就让Proxy可以方便的调用对应的Reflect方法，完成默认行为，作为修改行为的基础，也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为

}

// 静态方法
// Reflect静态方法大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的
{
  // Reflect.get(target, name, receiver) -- 查找并返回target对象的name属性，如果没有该属性，则返回undefined
  const myObject = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar
    }
  }

  console.log(Reflect.get(myObject, 'foo')); // 1
  console.log(Reflect.get(myObject, 'bar')); // 2
  console.log(Reflect.get(myObject, 'baz')); // 3


  // 如果name属性部署了读取函数getter，则读取函数的this绑定receiver
  const myObjectReceiver = {
    foo: 4,
    bar: 4
  }

  console.log(Reflect.get(myObject, 'baz', myObjectReceiver)); // 8

  // 如果第一个参数不是对象，则报错
  // console.log(Reflect.get(1, 'baz')); // TypeError: Reflect.get called on non-object
}

{
  // Reflect.set(target, name, value, receiver) -- 设置target对象的name属性等于value
  const myObject = {
    foo: 1,
    set bar(value) {
      console.log(this.foo, 'foo');
      return this.foo = value
    }
  }

  // console.log(myObject.foo); // 1

  // Reflect.set(myObject, 'foo', 2)
  // console.log(myObject.foo); // 2

  // Reflect.set(myObject, 'bar', 3)
  // console.log(myObject.foo); // 3

  // 如果name属性设置了赋值函数，则赋值函数的this绑定receiver
  const myObjectReceiver = { foo: 0 }

  Reflect.set(myObject, 'bar', 1, myObjectReceiver)
  console.log(myObject.foo); // 1
  console.log(myObjectReceiver.foo); // 1


  // 如果Proxy和Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会促会发Proxy.defineProperty拦截
  let p = {
    a: 'a'
  }

  let obj = new Proxy(p, {
    set(target, key, value, receiver) {
      console.log('set');
      Reflect.set(target, key, value, receiver)
    },

    defineProperty(target, key, attribute) {
      console.log('defineProperty');
      Reflect.defineProperty(target, key, attribute)
    }
  })

  obj.a = 'A' // set defineProperty
  console.log(obj); // { a: 'A' }

  // Proxy.set的receiver参数总是指向当前的Proxy实例（obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver（obj）上面
  // 导致出发defineProperty拦截，如果Reflect.set没有传入receiver，那就不会出发defineProperty拦截

  // Reflect.set -- 如果第一个参数不是对象，则报错
}


{
  // Reflect.has(obj, name) -- 对应name in obj里面的in运算符，第一个参数不是对象就报错
  const myObject = {
    foo: 1
  }

  // 旧写法
  console.log('foo' in myObject); // true

  // 新写法
  console.log(Reflect.has(myObject, 'foo')); // true
}


{
  // Reflect.deleteProperty(obj, name) -- 等同于delete obj[name],用于删除对象的属性, 如果第一个参数不是对象，则报错
  // 返回一个布尔值，如果删除成功或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false
  const myObj = { foo: 'bar' }
  
  console.log(delete myObj.foo, myObj); // true {}
  console.log(Reflect.deleteProperty(myObj, 'foo'), myObj); // true {}
}


{
  // Reflect.construct(target, args) -- 等同于new target(...args), 提供了一种不使用new，来调用构造函数的方法
  // 如果第一个参数表示函数，则会报错
  function Greeting(name) {
    this.name = name
  }

  // new的写法
  const instance = new Greeting('zs')
  console.log(instance); // Greeting { name: 'zs' }

  const instance1 = Reflect.construct(Greeting, ['zs'])
  console.log(instance1); // Greeting { name: 'zs' }
}


{
  // Reflect.getPrototypeOf(obj) -- 用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
  function FancyThing() {}
  const myObj = new FancyThing()

  // 旧写法
  console.log(Object.getPrototypeOf(myObj) === FancyThing.prototype); // true

  // 新写法
  console.log(Reflect.getPrototypeOf(myObj) === FancyThing.prototype); // true
}


{
  // Reflect.setPrototypeOf(obj, newProto)用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
  // 如果第一个参数是undefined或者null,Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。

  const myObj = {}

  // old write
  Object.setPrototypeOf(myObj, Array.prototype)

  // new write
  Reflect.setPrototypeOf(myObj, Array.prototype)

  console.log(myObj.length); // 0

  // 如果无法设置目标对象的原型(比如,目标对象禁止扩展), 会返回false
  console.log(Reflect.setPrototypeOf({}, null)); // true

  console.log(Reflect.setPrototypeOf(Object.freeze({}), null)); // false
  
}

{
  // Reflect.apply(func, thisArg, args) -- Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
  
  // 一般来说,如果要绑定一个函数的this对象,可以这样写fn.apply(obj, args),但是如果函数定义了自己的apply方法,就只能写成
  // Function.prototype.apply.call(fn, obj, args),采用Reflect对象可以简化这种操作
  const args = [11, 33, 12, 54, 18, 96]

  // old write
  const youngest = Math.min.apply(Math, args)
  const oldest = Math.max.apply(Math, args)
  const type = Object.prototype.toString.call(youngest)

  // new write
  const youngest1 = Reflect.apply(Math.min, Math, args)
  const oldest1 = Reflect.apply(Math.max, Math, args)
  const type1 = Reflect.apply(Object.prototype.toString, youngest1, [])

}

{
  // Reflect.defineProperty(target, propertyKey, attributes) -- 等同于Object.defineProperty,用来为对象定义属性
  // 如果第一个参数不是对象,就会抛出错误
  function MyDate() {}

  // old write
  Object.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  })

  // new write
  Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  })

  // 可以与Proxy.defineProperty配合使用
  const p = new Proxy({}, {
    defineProperty(target, prop,descriptor) {
      console.log(descriptor);
      return Reflect.defineProperty(target, prop, descriptor)
    }
  })

  p.foo = 'bar'
  console.log(p); // { foo: 'bar' }
}


{
  // Reflect.getOwnPropertyDescriptor(target, propertyKey) -- 等同于Object.getOwnPropertyDescriptor,用于得到指定属性的描述对象
  // 与 Object.getOwnPropertyDescriptor 的区别,如果第一个参数不是对象,前者报错,后者返回undefined
  const myObject = {}

  Object.defineProperty(myObject, 'hidden', {
    value: true,
    enumerable: false
  })

  // old write
  const desc = Object.getOwnPropertyDescriptor(myObject, 'hidden')

  // new write
  const desc1 = Reflect.getOwnPropertyDescriptor(myObject, 'hidden')

  console.log(desc, desc1); 
  // {
  //   value: true,
  //   writable: false,
  //   enumerable: false,
  //   configurable: false
  // } 
}

{
  // Reflect.isExtensible(target) -- 对应Object.isExtensible,返回一个布尔值,表示当前对象是否可扩展
  // 与Object.isExtensible区别,参数不是对象的话,前者会报错,后者则返回false
  const myObject = {}

  // old write
  Object.isExtensible(myObject)

  // new write
  Reflect.isExtensible(myObject)
}


{
  // Reflect.preventExtensions(target) -- 对应Object.preventExtensions方法,用于让一个对象变为不可扩展,返回一个布尔值,表示是否操作成功
  // 如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错.
}


{
  // Reflect.ownKeys(target) -- 等同于Object.getOwnPropertyNames和Object.getOwnPropertySymbols之和,第一个参数不是对象,会报错
  const myObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4
  }

  console.log(Object.getOwnPropertyNames(myObject)); // [ 'foo', 'bar' ]
  console.log(Object.getOwnPropertySymbols(myObject)); // [ Symbol(baz), Symbol(bing) ]
  console.log(Reflect.ownKeys(myObject)); // [ 'foo', 'bar', Symbol(baz), Symbol(bing) ]
}

{
  // Proxy实现观察者模式
  // 观察者模式指的是函数自动观察数据对象,一旦对象有变化,函数就会自动执行
  const queuedObservers = new Set();

  const observe = fn => queuedObservers.add(fn);
  const observable = obj => new Proxy(obj, {set});

  const person = observable({
    name: 'zs',
    age: 18
  })

  function print() {
    console.log(`${person.name}, ${person.age}`);
  }

  function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queuedObservers.forEach(observer => observer())
    return result
  }

  observe(print);
  person.name = '李四'; // 李四, 18

}


