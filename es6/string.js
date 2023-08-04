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

// 模板字符串 可以使用变量 换行  调用函数  嵌套模板字符串 js表达式（<% ... %>放置js代码 <%= ... %>输出表达式） 过滤HTML字符串，多语言转换
let a = 2
let arr = []
let fun = function(a) {
  console.log`${a}`
}

// 编译模板字符串,并正常输出里面的表达式
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

// 使用变量
console.log`${a}`
// 换行
console.log`
输出的变量是a,变量值是
${a}`
// 调用函数
console.log`${fun(a)}`
// 互相嵌套
console.log`嵌套了${`${a}`}`
// js表达式
let template = `
<ul>
<% for(let i=0; i < data.supplies.length; i++) { %>
  <li><%= data.supplies[i] %></li>
<% } %>
</ul>
`;

// console.log(compile(template));
let parse = eval(compile(template));
console.log(parse({ supplies: [ "broom", "mop", "cleaner" ] }));


// 过滤HTML字符串
let sender = '<script>alert("abc")</script>';
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;


function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

console.log(message); // <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>

// 多语言转换
// i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`



// 字符串新增方法

// 1. String.fromCodePoint()
// 能识别码点大于0xFFFF的字符,弥补了es5提供的String.fromCharCode()方法,作用正好与String.codePointAt()方法相反
// 如果有多个参数,则它们会被合并成一个字符串返回,此方法定义在String对象上,codePointAt定义在字符串的实例对象上


// 2. String.raw()
// 它可以作为处理模板字符串的基本方法,会将所有变量替换,而且对斜杠进行转移


// 3. String.codePointAt()
// 对于四个字节的字符,charAt方法无法读取整个字符,charCodeAt方法只能分别返回前两个字节和后两个字节的值
// codePointAt能够正确处理4个字节存储的字符,返回一个字符的码点

// 4. 实例方法 normalize()
// 可以识别两个字符的合成, 但是目前不能识别三个或三个以上字符的合成

// 5. 实例方法 includes() 返回布尔值,是否找到了参数字符串
// 6. 实例方法 startsWith() 返回布尔值,参数字符串是否在原字符串的头部
// 7. 实例方法 endsWith() 返回布尔值,参数字符串是否在原字符串的尾部
// 5 6 7都可以传入第二个参数,表示开始搜索的位置 Number类型

// 8. 实例方法 repeat() 返回一个新字符串,表示将原字符串重复n次

// 参数为 Infinity会报错 NaN等同于0 0-1之间的小数视为0


// 9. 实例方法 padStart()  padEnd()
// padStart用于头部补全 padEnd用于尾部补全 都有两个参数,第一个参数是字符串补全生效的最大长度,第二个参数是用来补全的字符串,默认第二个参数是空格

// 原字符串的长度等于或大于最大长度,则字符串补全不生效,返回原字符串
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

// 如果用来补全的字符串与原字符串,两者的长度之和超过了最大长度,则会截去超出位数的补全字符串
'abc'.padStart(10, '124236532576') // '1232365abc'

// 如果省略第二个参数,默认使用空格补全长度

// 常见用途就是为数值补全指定位数 
'1'.padStart(10, '0') // '0000000001'

// 还有一种用途是提示字符串格式
'12'.padStart(10, 'YYYY-MM-DD') // 'YYYY-MM-12'
'09-12'.padStart(10, 'YYYY-MM-DD') // 'YYYY-09-12'


// trimStart -- 消除头部空格,并返回新字符串,不会修改原始字符串
// trimEnd -- 消除尾部空格,并返回新字符串,不会修改原始字符串
// 对tab键 换行符等不可见的空白也有效,浏览器还部署了额外的两个方法,trimLeft(trimStart的别名)和trimRight(trimEnd的别名)

// matchAll -- 返回一个正则表达式在当前字符串的所有匹配


// replaceAll 
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
// 'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
// 'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
// 'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
// 'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
// 'abc'.replaceAll('b', '$$')
// 'a$c'


// 第二个参数也可以是一个函数
// 'abbbccc'.replaceAll('b', () => '_') // 'a__ccc'

const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}
// match是捕捉到的匹配内容 即字符串str
// p1 p2 p3 依次为三个组的匹配
// offset 捕捉到的内容在整个字符串中的位置
// string 是原字符串

// str.replaceAll(regex, replacer)
// 123 - abc - 456

// at方法
// 接受一个整数作为参数,返回参数指定位置的字符,支持负索引(即倒数的位置)
// str.at(1) // '2'
