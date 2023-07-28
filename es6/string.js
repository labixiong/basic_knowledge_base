// string

// es6为字符串添加了遍历器接口，遍历器最大的优点就是可以识别 0xFFFF 的码点，传统的for循环无法识别这样的码点
for (const iterator of '123') {
  console.log(iterator); // 1 2 3
}

let text = String.fromCodePoint(0x20BB7)

for (let index = 0; index < text.length; index++) {
  console.log(text[index]);
}

for (const iterator of text) {
  console.log(iterator);
}

// 模板字符串 可以使用变量 换行  调用函数  嵌套模板字符串 js表达式（<%= %>）

