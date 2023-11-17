# react-part

## 介绍

> 声明式、组件化一次学习、跨平台编写
> 单向数据流、虚拟DOM、diff算法

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架都不满意，就决定自己写一套，用来架设 Instagram 的网站。

下面介绍一下 *React* 几个重要版本的重大更新：

- *React 16* :出现了 *Fiber*，整个更新变的可中断、可分片、具有优先级
- *React 16.8*：推出了 *Hooks*，标志着从类组件正式转为函数组件
- *React 17*：过渡版本，没有添加任何面向开发人员的新功能。而主要侧重于**升级简化 *React* 本身**。
- *React 18*
  - *transition*
  - *Suspense*
  - 新的 *Hooks*
  - *Offscreen*
  - ......

## JSX基本语法

并不是html元素，实际是一个js对象

使用 *JSX* 来描述页面时，有如下的一些语法规则：

- 根元素只能有一个
- *JSX* 中使用 *JavaScript* 表达式。表达式写在花括号 *{}* 中
- 属性值指定为字符串字面量，或者在属性值中插入一个 *JavaScript* 表达式
- *style* 对应样式对象，*class* 要写作 *className*
- 注释需要写在花括号
- *JSX* 允许在模板中插入数组，数组会自动展开所有成员

*createElement* 方法

*JSX* 是一种 *JavaScript* 的语法扩展，*Babel* 会把 *JSX* 转译成一个名为 *React.createElement* 函数调用。


## 组件与事件绑定

组件有两种写法：函数组件和类组件（继承React.Component）

事件绑定：

```js
export default function App() {
  function clickHandle(e) {
    // e为封装后的事件对象SyntheticBaseEvent
    console.log(e);

    // nativeEvent为原生事件对象
    console.log(e.nativeEvent);
  }

  return (
    <div>
      <button onClick={clickHandle}>点击</button>
    </div>
  )
}
```

阻止表单的默认提交行为：

通过时间对象来阻止默认行为 `e.preventDefault()`

this的指向：如果直接调用函数那么会造成函数内部的this为undefined

三种解决方式：
- 把事件处理函数定义为箭头函数
- 将事件绑定修改为箭头函数
- 通过bind来改变this指向

## 组件状态和数据传递

### 组件状态
```js
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      num: 1
    }
  }

  clickHandle = () => {
    console.log(this);

    /**
     * 虽然写了三次，但是并没有加三次，因为react出于性能考虑会将多个setState进行合并
     */
    this.setState({
      num: this.state.num + 1
    })
    this.setState({
      num: this.state.num + 1
    })
    this.setState({
      num: this.state.num + 1
    })

    /**
     * setState它对状态的改变可能是异步的
     * 
     * 如果改变状态的代码处于HTML元素的事件中，则其是异步的，否则就是同步的
     * 
     * 这也就是下方输出为1的原因
     */
    console.log(this.state.num); // 1
  }

  render() {
    return (
      <div>
        <div>{this.state.num}</div>
        <button onClick={this.clickHandle}>点击+1</button>
      </div>
    )
  }
}
```

如果在事件处理函数里面想拿到 setState 执行后的数据，可以提前使用一个变量来存储计算结果，或者使用 setState 的第二个参数，它是一个函数，这个函数会在 state 更新后被调用。

```js
// 1. 使用变量存储
clickHandle = () => {
  let num = this.state.num + 1
  this.setState({
    num
  })
  console.log(num); // 2
}

// 2. setState提供了第二个参数，是一个回调函数，在回调函数中能拿到最新的结果
clickHandle = () => {
  this.setState({
    num: this.state.num + 1
  }, () => {
    console.log(this.state.num)
  })
}
```

最佳实践：
1. 把所有的 setState 当作是异步的
2. 永远不要相信setState调用之后的状态
3. 如果要使用改变之后的状态，需要使用回调函数（setState的第二个参数）
4. 如果新的状态要根据之前的状态进行计算，使用函数的方式改变状态（setState的第一个参数）

那么如何点一次按钮就实现改变状态三次呢？可以采用函数的方式

```js
clickHandle = () => {
  // 参数cur就是当前的state，后面的函数式调用会等之前的结束后拿到最新的state再进行调用
  this.setState((cur) => ({
    num: cur.num + 1
  }))
  this.setState((cur) => ({
    num: cur.num + 1
  }))
  this.setState((cur) => ({
    num: cur.num + 1
  }))
}
```

### 数据传递

1. 函数式组件

通过参数传递，可以直接拿到父组件传递的数据

```js

// Hello.jsx
import React from 'react'

export default function Hello(props) {
  return (
    <>
      <ul>
        <li>姓名：{props.stuInfo.name}</li>
        <li>年龄：{props.stuInfo.age}</li>
      </ul>
    </>
  )
}

// App.jsx
<Hello stuInfo={this.state}></Hello>
```

2. 类组件

传递的数据会直接绑定到this的props属性中，直接使用即可

```js
// World.jsx
import React, { Component } from 'react'

export default class World extends Component {
  render() {
    return (
      <>
        <ul>
          <li>姓名：{this.props.stuInfo.name}</li>
          <li>年龄：{this.props.stuInfo.age}</li>
        </ul>
      </>
    )
  }
}


// App.jsx
<World stuInfo={this.state}></World>
```

怎么对传入的props进行验证呢？

1. 如果没有传入则设置默认值 defaultProps

  ```jsx
  // 无论是函数组件还是类组件都可以通过defaultProps属性来设置默认值
  Hello.defaultProps = {
    stuInfo: {
      name: 'zs',
      age: 18
    }
  }

  // 类组件除了这种方式还可以通过设置静态属性来设置默认值
  static defaultProps = {
    stuInfo: {
      name: 'zs',
      age: 18
    }
  }
  ```

2. 如果传入了，验证一下是不是所需要的类型

    自 React v15.5 起，React.PropTypes 已移入另一个包中。请使用 prop-types 库 代替。

    首先要安装一下这个库，然后引入就可使用

  ```jsx
  // 组件中引入 
  import PropTypes from 'prop-types'

  // 通过对组件propTypes的属性进行类型约束
  Hello.propTypes = {
    stuInfo: PropTypes.object
  }
  ```

通过props.children可以实现Vue中类似插槽的功能,例如子组件定义按钮

```js
// Button.jsx
import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button>{props.children}</button>
    </div>
  )
}

// App.jsx
<Button>添加按钮</Button>
```


### 状态提升

在 Vue 中，父传子通过 props，子传父通过触发自定义事件。

在 React 中，如果子组件需要向父组件传递数据，同样是通过触发父组件传递给子组件的事件来进行传递。


```js
/**
 * 汇率案例 - 理解状态提升
 */
// 父组件
import React, { Component } from 'react'
import Money from './components/Money'

export default class App extends Component {
  state = {
    dollar: "",
    rmb: ""
  }

  transformToRMB = (value) => {
    if(parseFloat(value) || value === "" || parseFloat(value) === 0) {
      this.setState({
        dollar: value,
        rmb: value === "" ? "" : (value * 7.3255).toFixed(2)
      })
    } else {
      alert('请输入数字')
    }
  }

  // 子组件传递过来值由父组件处理
  transformToDollar = (value) => { 
    if(parseFloat(value) || value === "" || parseFloat(value) === 0) {
      this.setState({
        dollar: value === "" ? "" : (value * 0.1365).toFixed(2),
        rmb: value
      })
    } else {
      alert('请输入数字')
    } 
  }

  render() {
    return (
      <div>
        <Money text="美元" money={this.state.dollar} transform={this.transformToRMB}></Money>
        <Money text="人民币" money={this.state.rmb} transform={this.transformToDollar}></Money>
      </div>
    )
  }
}

// 子组件
import React from 'react'

export default function Money(props) {

  function handleInputChange(e) {
    // 将用户输入的值传递给父组件，让父组件进行修改
    props.transform(e.target.value)
  }

  return (
    <div>
      <fieldset>
        <legend>{props.text}</legend>
        <input type="text" value={props.money} onChange={handleInputChange} />
      </fieldset>
    </div>
  )
}
```

## 表单

受控组件，表单控件和state绑定，通过change事件进行改变值

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    value: ''
  }

  // 当文本框内容发生变化，去改变state状态
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleClick = () => {
    console.log(`你要提交的内容为：${this.state.value}`);
  }

  render() {
    return (
      <div>
        {/* 表单控件绑定的值为state中的值 */}
        <textarea name="three" id="" cols="30" rows="10" value={this.state.value} onChange={this.handleChange}></textarea>
        <button onClick={this.handleClick}>提交</button>
      </div>
    ) 
  }
}

```

非受控组件

基本示例:

```jsx
import React, { Component } from 'react'

export default class App extends Component {

  constructor() {
    super();

    // 创建一个ref，用于和控件绑定
    this.inputRef = React.createRef()
  }

  handleClick = () => {
    // 绑定了ref之后就可以获得一个对象 { current: input }  current的值就是当前ref绑定的DOM节点
    console.log(`你要提交的内容为：${this.inputRef.current.value}`);
  }

  render() {
    return (
      <div>

        {/* 非受控组件示例,输入框不能给value属性，如果给value属性值的话，React会认为这是一个受控组件 */}
        {/* 如果想要给默认值,可以使用defaultValue属性 */}
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>提交</button>
      </div>
    )
  }
}

```

文件上传

```jsx
import React, { Component } from 'react'

export default class App extends Component {

  constructor() {
    super();

    // 创建一个ref，用于和控件绑定
    this.uploadRef = React.createRef()
  }

  handleClick = () => {
    // 绑定了ref之后就可以获得一个对象 { current: input }  current的值就是当前ref绑定的DOM节点
    console.log(`你要提交的内容为：${this.uploadRef.current.files[0].name}`);
  }

  render() {
    return (
      <div>

        {/* 非受控组件示例,输入框不能给value属性，如果给value属性值的话，React会认为这是一个受控组件 */}
        {/* 如果想要给默认值,可以使用defaultValue属性 */}
        <input type="file" ref={this.uploadRef} />
        <button onClick={this.handleClick}>提交</button>
      </div>
    )
  }
}
```


## 生命周期

常用的生命周期钩子函数如下:

- constructor
    - 同一个组件对象只会创建一次
    - 不能在第一次挂载到页面之前,调用setState,为了避免问题,构造函数中严禁使用setState

- render
    - render 是整个类组件中必须要书写的生命周期方法
    - 返回一个虚拟 DOM，会被挂载到虚拟 DOM 树中，最终渲染到页面的真实 DOM 中
    - render 可能不只运行一次，只要需要重新渲染，就会重新运行
    - 严禁使用 setState，因为可能会导致无限递归渲染

- componentDidMount
    - 会在组件挂载后(插入DOM树中),立即调用. 依赖于DOM节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方
    - 类似于Vue中的mounted，可以在里面使用setState

- componentDidUpdate 更新的时候调用 首次渲染不会触发
- componentWillUnmount 组件销毁前触发


## Hooks

### 基本介绍

> [面向对象和函数式编程的区别](https://www.imaginarycloud.com/blog/functional-programming-vs-oop/)

React v16.8新增特性，可以让你在不编写class的情况下使用state以及其他的React特性

解决以下问题：

- 告别令人疑惑的生命周期

    如果需要在挂载时就需要做一些事，而且更新后还要做这些事，那么就会造成书写大量的代码

- 告别this
- 告别繁重的类组件，回归前端程序员更加熟悉的函数


HOOK实际就是js函数，使用规则：

1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
2. 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

两个常用的HOOK举例介绍

### useState

> 为函数式组件添加状态

- 基本使用

```js
import React, { useState } from 'react'

export default function App() {

  let [count, setCount] = useState(0)

  function clickHandle() {
    setCount(++count)
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickHandle}>+1</button>
    </div>
  )
}

```

- 定义多个

```js
import React, { useState } from 'react'

export default function App() {

  let [count, setCount] = useState(0) 
  let [age, setAge] = useState(18)
  let [fruit, setFruit] = useState('banana')
  let [todos, setTodos] = useState([{ text: '学习HOOK' }])

  function clickHandle() {
    setCount(++count)
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <div>年龄：{age}</div>
      <div>水果：{fruit}</div>
      <div>待办事项：{todos[0].text}</div>
      <button onClick={clickHandle}>+1</button>
    </div>
  )
}

```

### useEffect

> 处理函数副作用

- 副作用的概念

    - 纯函数：一个确切的参数在你的函数中运行后，一定能得到一个确切的值，例如下面的例子：

      ```js
      function test(x) {
        return x * 2
      }

      test(2) // 4
      test(3) // 6
      ```
    - 如果一个函数中，存在副作用，那么我们就称该函数不是一个纯函数，所谓副作用，就是指函数的结果是不可控，不可预期。
    - 常见的副作用有发送网络请求、添加一些监听的注册和取消注册，手动修改 DOM，以前我们是将这些副作用写在生命周期钩子函数里面，现在就可以书写在 useEffect 这个 Hook 里面

- 基本使用

```js
import React, { useState, useEffect } from 'react'

export default function App() {

  let [count, setCount] = useState(0)

  useEffect(() => {
    // 书写你要执行的副作用，会在组件渲染完成后执行
    // 第一次会执行，更新后也会执行
    document.title = `你点击了${count}次`
  })

  function clickHandle() {
    setCount(++count)
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickHandle}>+1</button>
    </div>
  )
}

```

- 执行清理工作

```js
import React, { useState, useEffect } from 'react'

export default function App() {

  let [count, setCount] = useState(0)

  useEffect(() => {
    // 每隔一秒输出Hello，但是当点击了多次按钮之后会快速输出多个Hello
    // 这时候就需要返回一个函数，函数的执行顺序在useEffect内部代码块执行之前执行
    const timer = setInterval(() => {
      console.log('Hello');
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  function clickHandle() {
    setCount(++count)
  }

  return (
    <div>
      <div>你点击了{count}次</div>
      <button onClick={clickHandle}>+1</button>
    </div>
  )
}

```

- 副作用的依赖

```jsx
// 目前，我们的副作用函数，每次重新渲染后都会重新执行，有些时候我们是需要设置依赖项，传递第二个参数（一个依赖项数组）
import React, { useState, useEffect } from 'react'

export default function App() {

  let [count, setCount] = useState(0)
  let [count1, setCount1] = useState(0)
  let [count2, setCount2] = useState(0)

  useEffect(() => {
    // 这样的话就只在count改变时才会执行副作用函数，count1、count2则不会执行此函数
    console.log('执行副作用函数');
  }, [count])

  return (
    <div>
      <div>{count}</div>
      <div>{count1}</div>
      <div>{count2}</div>
      <button onClick={() => setCount(++count)}>+1</button>
      <button onClick={() => setCount1(++count1)}>+1</button>
      <button onClick={() => setCount2(++count2)}>+1</button>
    </div>
  )
}

// 如果想要副作用只执行一次,那么第二个参数传递一个空数组即可
useEffect(() => {
  console.log('执行副作用函数');
}, [])

```

### 自定义Hook

本质就是普通函数,但还是会有一些区别

- 自定义Hook能够用诸如useState/useRef等,普通函数则不能.由此可以通过内置的Hooks获得Fiber的访问方式,可以实现在组件级别存储数据的方案等
- 自定义Hooks需要以use开头,普通函数没有这个限制.使用use开头并不是一个语法或者一个强制性的方案,更像是一个约定

React内部区分函数和自定义Hook的主要依据就是内部是否使用了React的Hook


## react-router

### 组件

- BrowserRouter：整个前端路由以 history 模式开始，包裹根组件
- HashRouter：整个前端路由以 hash 模式开始，包裹根组件
- Routes：类似于 v5 版本的 Switch，主要是提供一个上下文环境
- Route：在 Route 组件中书写你对应的路由，以及路由所对应的组件
  - path：匹配的路由
  - element：匹配上该路由时，要渲染的组件
- Navigate：导航组件，类似于 useNavigate 的返回值函数，只不过这是一个组件
- NavLink：类似于 Link，最终和 Link 一样，会被渲染为 a 标签，注意它和 Link 的区别，实际上就是当前链接，会有一个名为 active 的激活样式，所以一般用于做顶部或者左侧导航栏的跳转

### *Hooks*

- useLocation：获取到 location 对象，获取到 location 对象后，我们可以获取 state 属性，这往往是其他路由跳转过来的时候，会在 state 里面传递额外的数据
- useNavigate：调用之后会返回一个函数，通过该函数可以做跳转。
- useParams：获取动态参数

### *useRoutes*

使用示例如下：

```js
function Router(props) {
  return useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/add",
      element: <AddOrEdit />,
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
    {
      path: "/edit/:id",
      element: <AddOrEdit />,
    },
    {
      path: "/",
      element: <Navigate replace to="/home" />
    }
  ]);
}

export default Router;
```



### 嵌套路由

直接在 useRoutes 进行 chilren 属性的配置即可，类似于 vue-router，children 对应的是一个数组，数组里面是一个一个路由对象

```js
 {
   path: "/about",
     element: <About />,
     children : [
         {
           path : "email",
           element : <Email/>
         },
         {
           path : "tel",
           element : <Tel/>
         },
         {
           path : "",
           element: <Navigate replace to="email" />
         }
       ]
 },
```

之后，使用 Outlet 组件，该组件表示匹配上的子路由组件渲染的位置。

## react-redux

### 状态管理

