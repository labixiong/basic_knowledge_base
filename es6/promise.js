// promise
{
  /**
   * Promise有两个特点:
   *  1. 对象的状态不受外界影响,只有异步操作的结果可以决定当前是哪一种状态,任何其他操作都无法改变这个状态
   *  2. 一旦状态改变,就不会再变,任何时候都可以得到这个结果.如果改变已经发生了,你再对Promise对象添加回调函数,也会立即得到这个结果
   */
}

{
  // 基本用法
  const promise = new Promise(function(resolve, reject) {
    if(true) {
      resolve()
    } else {
      reject()
    }
  })

  // resolve和reject并不会中止promise运行
}

{
  // Promise.prototype.then() -- 为Promise实例添加状态改变时的回调函数
  // then方法有两个参数，一个是成功的回调，一个是失败的回调，还可以采用链式调用，上一个then返回的结果将作为下一个then的参数
}


{
  // Promise.prototype.catch()是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数
  // 如果异步操作抛出错误，就会调用catch方法指定的回调函数处理错误
  // 如果then方法指定的回调函数执行中抛出错误，也会被捕获
  // Promise内部的错误不会影响到外部的代码
  // catch方法后面还可以再跟then方法，如果catch没有捕捉到错误，则跳过catch执行后面的then
  // catch还可以用来捕获catch中的错误
}

{
  // Promise.prototype.finally() -- 不管Promise对象最后状态如何都会执行的操作
}

{
  // Promise.all() -- 用于将多个Promise实例，包装成一个新的Promise实例,如果不是Promise实例，就先调用Promise.resolved()方法转换成实例
  // const p = Promise.all([p1, p2, p3])

  // 只有当三个的状态都变成fulfilled，p的状态才会变成fulfilled，此时三个的返回值组成一个数组，返回给p的回调函数
  // 只要有一个被rejected，p的状态就变成rejected，此时第一个被rejected的实例的返回值，会传递给p的回调函数
  // 
}

{
  // Promise.race() -- 将多个Promise实例，包装成一个新的Promise实例,如果不是Promise实例，就先调用Promise.resolved()方法转换成实例
  // const p = Promise.all([[p1, p2, p3]])

  // 只要三个之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
}


{
  // Promise.allSettled -- 只有等到数组的所有Promise对象都发生状态变更，返回的Promise对象才会发生状态变更

}


{
  // Promise.any() -- 接受一组Promise实例作为参数，包装成一个新的Promise实例返回
  // any与race方法很像，只有一点不同，就是any不会因为某个Promise变成rejected状态而结束，必须等到所有参数Promise变成rejected状态才会结束
  // 只要有一个变成fulfilled，返回的Promise对象就会变成fulfilled，如果所有都变成rejected，就会变成rejected状态
}

{
  // Promise.resolve() 可将现有对象转为Promise对象
  // Promise.resolve('foo') 等同于 new Promise(resolve => resolve('foo'))

  /**
   * 参数分为四种情况
   * 
   * 1. 参数是一个Promise实例
   * 2. 参数是一个thenable对象
   * 3. 参数不是具有then()方法的对象，或根本就不是对象
   * 4. 不带有任何参数
   */

  // 1. 参数是一个Promise实例
  // 如果参数是Promise实例,那么Promise.resolve将不做任何修改,原封不动的返回这个实例

  // 2. 参数是一个thenable对象
  // thenable对象指的是具有then方法的对象
  const thenable = {
    then: function(resolve, reject) {
      resolve(42)
    }
  }

  // Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法
  const p1 = Promise.resolve(thenable)
  p1.then(value => {
    console.log(value); // 42
  })

  // 3. 参数不是具有then()方法的对象，或根本就不是对象
  // 如果参数是一个原始值，或者是一个不具有then方法的对象，则返回一个新的Promise对象，状态为resolved

  // 4. 不带有任何参数
  // 直接返回一个resolved状态的Promise对象
}


{
  // Promise.reject() -- 返回一个新的Promise实例，该实例的状态为rejected

  const p = Promise.reject('出错了') // 等同于 new Promise((resolve, reject) => reject('出错了'))

  p.then(null, function(s) {
    console.log(s); // 出错了
  })

  // Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
}


{
  // Promise.try() -- 让同步的函数被Promise包裹后，不变成异步执行

  // 让同步函数被Promise包裹后不变成异步执行有三种方式

  // 1. 用一个立即执行函数执行new Promise
  const f = () => console.log('now');
  (
    () => new Promise(
      resolve => resolve(f())
    )
  )();
  console.log('next');

  // 依次输出为now next

  // 2. async -- 会忽略函数抛出的错误
  (async () => f())();
  console.log('next');
  // 依次输出为now next

  // 3. 统一方式用Promise.try包裹
  // Promise.try(() => {})
  //     .then()
  //     .catch()
}

