// Generator

{
  function* helloWorldGenerator() {
    yield 'hello'
    yield 'world'
    return 'ending'
  }

  const hw = helloWorldGenerator()

  // console.log(hw.next()); // { value: 'hello', done: false }
  // console.log(hw.next()); // { value: 'world', done: false }
  // console.log(hw.next()); // { value: 'ending', done: true }
  // console.log(hw.next()); // { value: undefined, done: true }

  // yield只能用在Generator函数里,用在别的地方会报错

  var arr = [1, [[2, 3], 4], [5, 6]];

  var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
      var item = a[i];
      if (typeof item !== 'number') {
        yield* flat(item);
      } else {
        yield item;
      }
    }
  };

  for (var f of flat(arr)) {
    // console.log(f);
  }

  // 上面的代码会报错,可以使用for循环代替forEach

  // yield表达式如果在另外一个表达式中,必须放在圆括号里
  function* demo() {
    console.log('Hello' + (yield 123));
  }

  demo()

  // yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
}

{
  // 由于Generator函数就是遍历器生成函数,所以可以直接把函数赋值给Symbol.iterator属性.
  const myIterable = {}

  myIterable[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }

  console.log(...myIterable); // 1 2 3 


  function* foo(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
  }

  const a = foo(5)
  // console.log(a.next()); // { value: 6, done: false }
  // console.log(a.next(12)); // 将上一步yield表达式的值设为12,即yield (x + 1)的值是12,所以y的值是24,返回 y / 3的的值8
  // console.log(a.next(13)); // 将上一步yield的值设为13,即z等于13 这时x是5,y是24,结果是42

  // 由于next函数的参数表示上一个yield表达式的返回值,所以第一次使用next方法时,传递参数是无效的


  function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result'
  }

  let genObj = dataConsumer()
  // genObj.next() // 'Started'
  // genObj.next('a') // 1. a
  // genObj.next('b') // 2. b


  // 第一次调用next方法时,就能够输入值
  function wrapper(generatorFunction) {
    return function (...args) {
      let generatorObject = generatorFunction(...args);
      generatorObject.next();
      return generatorObject;
    };
  }

  const wrapped = wrapper(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
  });

  wrapped().next('hello')
}


{
  // forof循环
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }

  for (const v of foo()) {
    console.log(v); // 1 2 3 4 5
  }



  // 利用Generator和forof实现斐波那契数列
  function* fibonacci() {
    let [prev, cur] = [0, 1];
    for(;;) {
      yield cur;
      [prev, cur] = [cur, prev + cur];
    }
  }

  // forof语句中不需要使用next方法
  for (const n of fibonacci()) {
    if(n > 1000) break;
    // console.log(n);
  }


  // 使用forof循环为对象添加遍历接口
  function* objectEntries() {
    let propKeys = Reflect.ownKeys(this)

    for (const propKey of propKeys) {
      yield [propKey, this[propKey]]
    }
  }

  let jane = { first: 'Jane', last: 'Doe' }

  // 也可以将函数直接赋值给对象的Symbol.iterator属性
  // 函数也不必传参,函数内部Reflect.ownKeys参数改为this, 意为当前对象 object[propKey]改为this[propKey]
  jane[Symbol.iterator] = objectEntries

  for (const [key, value] of jane) {
    console.log(key, value)
    // first Jance
    // last Doe
  }


  // 除了forof循环以外,扩展运算符... ,解构赋值和Array.from方法内部调用的都是遍历器接口.
  function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
  }

  console.log([...numbers()]); // [1, 2]

  console.log(Array.from(numbers())); // [1, 2]

  // 解构赋值
  let [x, y] = numbers()
  console.log(x, y); // 1 2

  for (const n of numbers()) {
    console.log(n);
    // 1
    // 2
  }
}


{
  // Generator.prototype.throw() -- Generator函数返回的遍历器对象都有一个throw方法,可以在函数体外抛出错误,然后在Generator函数体内捕获
  const g = function* () {
    yield 30;
    // try {
    //   yield;
    // } catch (e) {
    //   console.log('内部捕获', e);
    // }
  }

  const i = g()
  i.next()

  try {
    i.throw('a')
    i.throw('b') // 建议抛出Error对象的实例 i.throw(new Error('b'))
  } catch (e) {
    console.log('外部捕获', e);
  }

  // 内部捕获 a
  // 外部捕获 b

  // 第一个错误被generator函数体内的catch语句捕获,第二次错误,由于函数内部的catch已经执行过了,不会再捕捉到这个错误了,所以这个错误就被抛出了函数体,被函数体外的catch语句捕获
  // throw方法抛出的错误要被内部捕获(有try...catch代码块),前提是必须至少执行过依次next方法,如果不执行next方法,直接使用throw抛出错误不会被内部捕获,导致程序出错
  // 只要内部有try...catch代码块,那么遍历器的throw方法抛出的错误不影响下一次的遍历

  // 全局的throw命令只能被函数体外的catch语句捕获
  // 如果Generator函数体内部并没有写trycatch代码块,那么throw方法抛出的错误将被外部catch捕获
  // 如果内部外部都没有catch,那么程序将报错,直接中断执行


  // 一旦Generator执行过程中抛出错误,且没有被内部捕获,就不会再执行下去了.如果此后还调用next方法,将返回一个value属性等于undefined,done属性等于true的对象,即javascript引擎
  // 认为这个Generator已经运行结束了

  function* g2() {
    yield 1;
    console.log('throwing an exception');
    throw new Error('generator broke!')
    yield 2;
    yield 3;
  }

  function log(generator) {
    let v;
    console.log('starting generator');
    try {
      v = generator.next()
      console.log('第一次运行next方法', v);
    } catch (error) {
      console.log('捕捉错误', v);
    }

    try {
      v = generator.next()
      console.log('第二次运行next方法', v);
    } catch (error) {
      console.log('捕捉错误', v);
    }

    try {
      v = generator.next();
      console.log('第三次运行next方法', v);
    } catch (err) {
      console.log('捕捉错误', v);
    }
    console.log('caller done');
  }

  log(g2())

  /**
   *  starting generator
      第一次运行next方法 { value: 1, done: false }
      throwing an exception
      捕捉错误 { value: 1, done: false }
      第三次运行next方法 { value: undefined, done: true }
      caller done
   */

}

{
  // Generator.prototype.return() -- 返回给定的值,并且终结遍历Generator函数
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }

  const g = gen()
  console.log(g.next()); // { value: 1, done: false }
  console.log(g.return('foo')); // { value: 'foo', done: true }
  console.log(g.next()); // { value: undefined, done: true }

  // 遍历器对象g调用return方法后,返回值的value属性就是return方法的参数foo.并且,Generator函数的遍历就终止了,done为true
  // 如果调用return方法时,不提供参数,则返回值的value属性为undefined
  // 如果函数内部有try...finally代码块,且正在执行try代码块,那么return方法会导致立刻进入finally代码块,执行完以后,整个函数才会结束
  function* numbers() {
    yield 1;
    try {
      yield 2;
      yield 3;
    } finally {
      yield 4;
      yield 5;
    }
  }

  const n = numbers()
  console.log(n.next());
  console.log(n.next());
  console.log(n.return(7));
  console.log(n.next());
  console.log(n.next());

  /**
   *  { value: 1, done: false }
      { value: 2, done: false }
      { value: 4, done: false }
      { value: 5, done: false }
      { value: 7, done: true }
   */

}

{
  // next throw return -- 都是让Generator函数恢复执行,并且使用不同的语句替换yield表达式

  // next是将yield表达式替换成一个值
  const g = function* (x, y) {
    let result = yield x + y;
    return result
  }

  const gen = g(1, 2)
  console.log(gen.next()); // { value: 3, done: false }
  // console.log(gen.next(1)); // { value: 1, done: true }

  // throw是将yield表达式替换成一个throw语句
  // gen.throw(new Error('出错了'))

  // 相当于将 let result = yield x + y
  // 替换成 let result = throw(new Error('出错了'));

  // return是将yield表达式替换成一个return语句
  console.log(gen.return(2)); // { value: 2, done: true }
  // 相当于将 let result = yield x + y
  // 替换成 let result = return 2;
}


{
  // yield* 表达式 -- 如果在Generator函数内部,调用另一个Generator函数.需要在前者的函数内部,自己手动完成遍历
  function* foo() {
    yield 'a';
    yield 'b';
  }

  function* bar() {
    yield 'x';
    for (const i of foo()) {
      console.log(i);
    }
    yield 'y';
  }

  for (const v of bar()) {
    console.log(v);
  }

  /**
   * x
   * a
   * b
   * y
   */

  // 上面虽然能完成内嵌Generator函数,但是写法比较麻烦
  // es6提供了yield* 表达式,作为解决方法,用来在一个Generator函数里面执行另一个Generator函数

  function* bar2() {
    yield 'x';
    yield* foo();
    yield 'y';
  }

  for (const v of bar2()) {
    console.log(v);
  }

  /**
   * x
   * a
   * b
   * y
   */
}
