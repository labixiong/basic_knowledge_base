// 运算符

// ** 右结合 从右往左运算
2 ** 2 // 4
2 ** 3 // 8

2 ** 3 ** 2 // 512 相当于 2 ** (3 ** 2)


// **=
a **= 2 // a = a * a
b **= 3 // b = b * b * b


// ?. 判断左侧的对象是否为unll或者undefined，如果是的，就不再往下运算，而是返回undefined

const firstName = message?.body?.user?.firstName || 'default';

// 可选链的三种写法
// obj?.name  obj?.[name] func?.(...args) 前两种表示对象属性是否存在，最后一种表示函数或对象方法是否存在


// ?? 只有运算符左侧的值为null或者undefined时，才会返回右侧的值

// ||=   user.id = user.id || 1  等同于  user.id ||= 1
// &&=
// ??=  opts.foo = opts.foo || 'bar' 等同于 opts.foo ??= 'bar'



