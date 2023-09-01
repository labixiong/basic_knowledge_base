const util = require('util')

async function delay(duration = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(duration)
    }, duration);
  })
}

// delay(500).then(d => {
//   console.log(d); // 500
// })

// 使用util.callbackify将异步函数变为回调的模式

// const delayCallback = util.callbackify(delay)

// delayCallback(500, (err, d) => {
//   console.log(d); // 500
// })


// 将回调函数改为异步函数
function delayCallback2(duration, callback) {
  setTimeout(() => {
    callback(null, duration)
  }, duration);
}

const delay2 = util.promisify(delayCallback2);

// 1.
// delay2(500).then(d => console.log(d)) // 500

// 2. 
(async () => {
  const r = await delay2(500)
  console.log(r);
})();



// 深度严格相等
const obj1 = {
  a: {
    b: 1,
    c: {
      d: 2,
      e: 3
    }
  }
}

const obj2 = {
  a: {
    b: 1,
    c: {
      d: 2,
      e: "3"
    }
  }
}

console.log(util.isDeepStrictEqual(obj1, obj2)); // false
