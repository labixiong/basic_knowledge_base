// symbol
let x = Symbol('foo')
let x1 = Symbol('foo')

console.log(x.description, x.toString(), x.valueOf()); // foo Symbol(foo) Symbol(foo)

// for会在全局注册以供搜索，会先检索有没有foo这个symbol，如果有则返回已经注册的，没有的话再进行注册

// 通过Symbol普通生成的，则不会进行全局注册，就算内部字符串一致，也不相等
let y = Symbol.for('foo')

let z = Symbol.for('foo')

console.log(y === z); // true
console.log(x === x1); // false

// Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

// iframe = document.createElement('iframe');
// iframe.src = String(window.location);
// document.body.appendChild(iframe);

// iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')




// keyFor -- 返回一个已经登记的Symbol类型的key,未登记则返回undefined
console.log(Symbol.keyFor(y)); // foo