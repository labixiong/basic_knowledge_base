// node生命周期

{
  const fs = require("fs");
  fs.readFile("./index.js", () => {
    setTimeout(() => console.log(1), 0);
    setImmediate(() => console.log(2));
  });

  // 2 1
}

{
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }

  async function async2() {
    console.log("async2");
  }

  console.log("script start");

  setTimeout(function() {
    console.log("setTimeout0");
  }, 0);

  setTimeout(function() {
    console.log("setTimeout3");
  }, 3);

  setImmediate(() => console.log("setImmediate"));

  process.nextTick(() => console.log("nextTick"));

  async1();

  new Promise(function(resolve) {
    console.log("promise1");
    resolve();
    console.log("promise2");
  }).then(function() {
    console.log("promise3");
  });

  console.log("script end");

  /**
   * script start
   * async1 start
   * async2
   * promise1
   * promise2
   * script end
   * 
   * - 此时清空nextTick和Promises
   * nextTick
   * async1 end
   * promise3
   * 
   * - 最后三个的输出顺序取决于计算机当时的环境和处理速度
   * - 但是 setTimeout0 肯定是在 setTimeout3之前的， setImmediate输出顺序随机
   *  setTimeout0
   * setTimeout3
   * setImmediate
   * 
   * ---
   * 
   * nextTick: nextTick
   * Promises: async1 end  promise3
   * 
   * timers: 0 ~ setTimeout0 3 ~ setTimeout3
   * checkes: setImmediate
   * 
   */
}
