import isPrime from "./isPrime"

// 不断地产生数字
export default class NumberTimer {
  constructor(duration = 500) {
    this.duration = duration
    this.number = 1 // 记录当前数字，从1开始
    this.onCreatedNumber = null
    this.timer = null
  }
  
  start() {
    if(this.timer) {
      return
    }
    this.timer = setInterval(() => {
      this.onCreatedNumber && this.onCreatedNumber(this.number, isPrime(this.number))
      this.number ++
    }, this.duration);
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
  }
}