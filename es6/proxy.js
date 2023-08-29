// proxy

var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});

obj.count = 1 // setting count!

++obj.count // getting count!  setting count!


// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


// get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和proxy实例本身
const person  = { name: '张三' }

const proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
})

console.log(proxy.name); // 张三
// console.log(proxy.age); // ReferenceError: Prop name "age" does not exist.

// get方法可以继承
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey]
  }
})

let obj1 = Object.create(proto)
obj1.foo // GET foo

function createArray(...elements) {
  let handler = {
    get(target, propKey,receiver) {
      let index = Number(propKey)
      if(index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    }
  }

  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
console.log(arr[-1]); // 'c'

// 利用proxy可以将读取属性的操作(get)，转变为执行某个函数，从而实现属性的链式操作
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

const double = n => n * 2
const pow = n => n * n
const reverseInt = n => n.toString().split("").reverse().join("") | 0

// pipe(3).double.pow.reverseInt.get
// console.log(globalThis);

// 利用get拦截，实现一个生成各种DOM节点的通用函数dom
// const dom = new Proxy({}, {
//   get(target, prop) {
//     return function(attrs = {}, ...children) {
//       const el = document.createElement(prop)
//       for (const p of Object.keys(attrs)) {
//         el.setAttribute(prop, attrs[prop])        
//       }

//       for (const child of children) {
//         if(typeof child === 'string') {
//           child = document.createTextNode(child)
//         }
//         el.appendChild(child)
//       }

//       return el
//     }
//   }
// })

// const el = dom.div({},
//   'Hello, my name is ',
//   dom.a({href: '//example.com'}, 'Mark'),
//   '. I like:',
//   dom.ul({},
//     dom.li({}, 'The web'),
//     dom.li({}, 'Food'),
//     dom.li({}, '…actually that\'s it')
//   )
// );

// document.body.appendChild(el);



// set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和proxy实例本身，其中最后一个参数可选
let validator = {
  set: function(obj, prop, value, receiver) {
    // receiver -- 指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身
    if(prop === 'age') {
      if(!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if(value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }

    obj[prop] = value
    return true
  }
}

let person1 = new Proxy({}, validator)

person1.age = 100
console.log(person1.age);
// person1.age = 'young' // TypeError: The age is not an integer
// person1.age = 300 // RangeError: The age seems invalid

// 注意，如果目标对象自身的某个属性不可写，那么set方法将不起作用
// 注意，set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错


// apply方法拦截函数的调用、call、apply操作
// 接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
const handler1 = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments)
  }
}

const target = function() { return 'I am the target' }
const handler2 = {
  apply: function () {
    return "I am the proxy"
  }
}

const p = new Proxy(target, handler2)

// 变量p是Proxy的实例，当它作为函数调用时，就会被apply方法拦截，返回一个字符串
console.log(p()); // I am the proxy

const twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}

function sum(left, right) {
  return left + right
}

const proxy2 = new Proxy(sum, twice)
console.log(proxy2(1, 2)); // 6
console.log(proxy2.call(null, 5, 6)); // 22
console.log(proxy2.apply(null, [7,8])); // 30
console.log(Reflect.apply(proxy2, null, [9, 10])); // 38

// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效

// has方法可以接受两个参数，分别是目标对象，需查询的属性名
const handler3 = {
  has(target, key) {
    if(key[0] === '_') {
      return false
    }
    return key in target
  }
}

const target2 = { _prop: 'foo', prop: 'foo' }
const proxy3 = new Proxy(target2, handler3)
console.log('_prop' in proxy3); // false

// 如果原对象不可配置或者禁止扩展，这时has()拦截会报错。
var obj = { a: 10 };
Object.preventExtensions(obj);

var p2 = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

// console.log('a' in p2) // TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible at Object.<anonymous>

// 注意的是，has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has()方法不判断一个属性是对象自身的属性，还是继承的属性。
// has拦截对forin循环不生效


// construct方法用于拦截new命令, 必须返回一个对象，否则会报错
// target -- 目标对象  args -- 构造函数的参数数组 newTarget -- 创建实例对象时，new命令作用的构造函数
const handler4 = {
  construct(target, args, newTarget) {
    return new target(...args)
  }
}

// 由于 construct 拦截的是构造函数，所以它的目标（new Proxy的第一个参数）必须是函数，否则就会报错
// construct方法中的this指向的是handler（配置对象）
const p3 = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p3(1)).value // called: 1


const handle5 = {
  construct: function(target, args) {
    console.log(this === handle5);
    return new target(...args)
  }
}

const p4 = new Proxy(function () {}, handle5)
console.log(new p4()); // true {}


// deleteProperty 用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
var handler5 = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target3 = { _prop: 'foo' };
var proxy6 = new Proxy(target3, handler5);
// delete proxy6._prop // Error: Invalid attempt to delete private "_prop" property

// 注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。


// defineProperty 方法拦截了Object.defineProperty操作
// 注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错
// 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。


// getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor，返回一个属性描述对象或者undefined

const handler6 = {
  getOwnPropertyDescriptor(target, key) {
    if(key[0] === '_') {
      return
    }

    return Object.getOwnPropertyDescriptor(target, key)
  }
}

const target4 = { _foo: 'bar', baz: 'tar' }
const proxy4 = new Proxy(target4, handler6)
console.log(Object.getOwnPropertyDescriptor(proxy4, 'wat'));
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy4, '_foo'));
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy4, 'baz')); // { value: 'tar', writable: true, enumerable: true, configurable: true }



// getPrototypeOf 方法主要用来拦截获取对象原型，主要拦截以下操作，此方法必须返回对象或者null，否则报错，如果目标对象不可扩展，必须返回目标对象的原型对象
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof

const proto1 = {}
const p5 = new Proxy({}, {
  getPrototypeOf(target) {
    return proto1
  }
})

console.log(Object.getPrototypeOf(p5) === proto1); // true


// isExtensible()方法拦截Object.isExtensible()操作，只能返回布尔值，否则返回值会被自动转为布尔值
// 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误


// ownKeys方法用来拦截对象自身属性的读取操作，主要拦截以下操作
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys() -- 使用此方法时，目标对象上不存在的属性，属性名为Symbol值，不可遍历的属性不会返回
// for...in循环

// ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
// 如果目标对象是不可扩展的，这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错


// preventExtensions方法拦截Object.preventExtensions，返回一个布尔值，否则会被自动转为布尔值
// 只有目标对象不可扩展时（即Object.isExtensible(proxy)为false）,proxy.preventExtensions才能返回true，否则会报错


// setPrototypeOf方法用来拦截Object.setPrototypeOf方法
const handler7 = {
  setPrototypeOf(target, proto) {
    throw new Error('Changing the prototype is forbidden')
  }
}

const proto2 = {}
const target5 = function() {}
const proxy7 = new Proxy(target5, handler7)
// Object.setPrototypeOf(proxy7, proto2) // Error: Changing the prototype is forbidden

// 只要修改target5的原型对象就会报错
// 该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展，setPrototypeOf方法不得改变目标对象的原型


// Proxy.revocable 方法返回一个可取消的Proxy实例
{
  let target = {}
  let handler = {}
  let { proxy, revoke } = Proxy.revocable(target, handler)

  proxy.foo = 123
  console.log(proxy.foo); // 123

  revoke()
  console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked

  // proxy为Proxy实例，revoke函数可以取消Proxy实例
  // Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
}

{
  // this问题
  // 被代理对象里面的this所指向的是proxy
  // proxy内部的this指向的是handler对象
}
