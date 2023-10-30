// 可以在类中书写初始化字段
class Test {
  a = 1;
  constructor(name = '') {
    this.name = name
  }
}

// 为某个方法绑定this
function Print() {
  console.log(this.loginId);
}

const obj = {
  loginId: 'admin'
}

obj::Print() // 相当于Print.call(obj) obj调用Print方法,Print内部的this绑定obj对象


// 可选链操作,判断深层属性
const obj2 = {
  foo: {
    bar: {
      baz: 2
    }
  }
}


console.log(obj2?.foo?.bar?.baz);
console.log(obj2?.foo?.qux);
