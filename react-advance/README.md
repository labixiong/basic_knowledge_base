# react-advance react进阶

# 第一章

## 类型验证

> 借助prop-types仓库 文件位置: src/components/ValidateProps.jsx

**https://legacy.reactjs.org/docs/typechecking-with-proptypes.html**

```js
// App.jsx
import './App.css';
import ValidateProps from './components/ValidateProps';
function App() {
  return (
    <div className="App">
      <ValidateProps class='三年三班' age={20}>
        <span>插槽内容1</span>
        <span>插槽内容222222</span>
      </ValidateProps>
    </div>
  );
}

export default App;

```

组件内部定义

```js
import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateProps(props) {
  return (
    <div>
      <span>{props.name}</span>
      <span>{props.age}</span>
      <span>{props.class}</span>
      <span>{props.team}</span>
      <span>{props.score}</span>
      {props.children[0]} - {props.children[1]}
    </div>
  )
}

ValidateProps.defaultProps = {
  name: 'zs',
  age: 18,
  class: '三年二班',
  team: [1,2,3],
  score: [100, 97, 120]
}

ValidateProps.propTypes = {
  // 自定义验证规则
  name: function(props, propName, componentName) {
    if (!/\S/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
  age: PropTypes.number,
  class: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.number),
  score: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/\d/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }),
  children: PropTypes.array
}


```


## 高阶组件(Higher-Order Components - 简称: HOC)

- 并非组件,而是一个函数,增强组件功能的一个函数
- 对多组件公共逻辑进行一个横向抽离

类似于vue的mixins

高阶组件还可嵌套

*HOC* 实际上就是为了解决早期**类组件**的公共逻辑抽离的问题，那个时候在 *React* 中类组件占主流。但是随着目前 *Hook* 的出现，函数组件开始占主流，*React* 开发的思想也从面向对象转为了函数式编程，抽离公共逻辑也能够非常简单的使用自定义 *Hook* 来实现了。

就像Vue3借鉴了React中的Hooks以及实现了Composition Api就不再需要Vue2中的mixins了

组件1

```js
// 组件1 - src/components/TestHOC1.jsx
import React from 'react'

export default function TestHOC1(props) {
  return (
    <div>
      这是子组件1
      <div>姓名：{props.name}</div>
    </div>
  )
}

TestHOC1.defaultProps = {
  name: 'TestHOC1'
}

```

组件2

```js
// 组件2 - src/components/TestHOC2.jsx
import React from 'react'

export default function TestHOC2(props) {
  return (
    <div>
      这是子组件2
      <div>姓名：{props.name}</div>
    </div>
  )
}

TestHOC2.defaultProps = {
  name: 'TestHOC2'
}

```

抽取公共部分

```js
// 抽取公共部分 - src/HOC/withLog.js
import { useEffect } from 'react'
import { formatDate } from '../utils/index'

/**
 * 接收一个组件 返回一个新组件
 * @param {*} Component 接收组件 
 * @returns 返回一个新组件
 */
export default function withLog(Component) {
  return function NewComponent(props) {
    // 抽离的公共逻辑
    useEffect(()=>{
      console.log(`日志：组件${Component.name}已经创建，创建时间${formatDate(Date.now(),"year-time")}`);
      return function(){
          console.log(`日志：组件${Component.name}已经销毁，销毁时间${formatDate(Date.now(),"year-time")}`);
      }
    },[])
    // 一般来讲，传入的组件会作为新组件的视图
    return <Component {...props} />
  }
}

// 应用 - App.jsx
import './App.css';
import withLog from './HOC/withLog'
import withTimer from './HOC/withTimer'
import TestHOC1 from './components/TestHOC1';
import TestHOC2 from './components/TestHOC2';

const NewComp1 = withTimer(withLog(TestHOC1)) // 嵌套操作
const NewComp2 = withLog(TestHOC2)

function App() {
  return (
    <div className="App">
      <NewComp1></NewComp1>
      <NewComp2></NewComp2>
    </div>
  );
}

export default App;


```

## Ref

Ref包含以下内容:

- 过时的API: `String`类型的`Refs` 现已被弃用
- `createRef API`
- `Ref`转发
- `useRef`与`useImperativeHandle`


1. `string`类型的ref

```js
import React from 'react'

export default class Ref extends React.Component {
  handleClick = () => {
    console.log(this.refs);
    this.refs.inputRef.focus() // 点击button按钮就会让input聚焦
  }

  render () {
    return (
      <div>
        <input type="text" ref='inputRef' />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    )
  }
}

```

2. createRef创建ref

```js
import React, { createRef } from 'react'

export default class Ref extends React.Component {

  constructor() {
    super();
    this.inputRef = createRef()
  }

  handleClick = () => {
    console.log(this.inputRef);
    this.inputRef.current.focus()
  }

  render () {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    )
  }
}

```

3. 在createRef出现之前可以使用ref回调函数形式获取实例

```js
export default class Ref extends React.Component {

  constructor() {
    super();
    // element 当ref绑定的是一个元素时获取的时元素，如果绑定的是一个组件时则获取到的是组件实例
    this.inputRef = element => {
      this.inputDOM = element
    }
  }

  handleClick = () => {
    // console.log(this.inputRef);
    // this.inputRef.current.focus()
    this.inputDOM.focus()
  }

  render () {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    )
  }
}
```

4. ref转发

高阶组件内部是重新返回了一个新组件，新组件无法获取到原来组件的ref，所以要在高阶组件内部再进行转发ref

```js
import React, { Component } from 'react'
import { formatDate } from '../utils';

export default function withLogClass(Com) {
  class withLogCom extends Component {
    constructor(props) {
      super(props);
      this.state = { n: 1 };
    }
    componentDidMount() {
      console.log(
        `日志：组件${Com.name}已经创建，创建时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    componentWillUnmount() {
      console.log(
        `日志：组件${Com.name}已经销毁，销毁时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    render() {
      const { forwardRef, ...rest } = this.props
      return <Com ref={forwardRef} {...rest} />;
    }
  };

  return React.forwardRef((props, ref) => {
    return <withLogCom { ...props } forwardRef={ref} ></withLogCom>
  })
}

```

5. useRef 与 useImperativeHandle

函数式组件是无法挂载ref的，此时旧需要使用useImperativeHandle Hook 结合forwardRef转发ref 一起使用

```js
function Ref(props, ref) {

  const childRef = useRef()

  useImperativeHandle(ref, () => ({
    click: handleClick,
    test: () => {
      console.log('子组件test方法');
    }
  }))

  function handleClick () {
    console.log('子组件click');
  }


  return (
    <div ref={childRef}>
      子组件
    </div>
  )
}

export default React.forwardRef(Ref)
```

6. useRef的其余用法

如果这个 *App* 组件里有 *state* 变化或者他的父组件重新 *render* 等原因导致这个 *App* 组件重新 *render* 的时候，我们会发现，点击停止按钮，定时器依然会不断的在控制台打印，定时器清除事件无效了。

因为组件重新渲染之后，这里的 *timer* 以及 *clearTimer* 方法都会重新创建，*timer* 已经不是存储的之前的定时器的变量了。

此时根据 *useRef* 在组件的整个生命周期内都不会改变的特性，我们可以将定时器变量存储到 *useRef* 所创建的对象上面，示例如下：

```js
import { useState, useEffect, useRef } from 'react';

function App() {
  let timer = useRef(null);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    // 如果直接使用timer而不是使用useRef创建timer的话，就会出现控制台打印停止不了的情况
    // 所以要借助useRef
    timer.current = setInterval(() => {
      console.log('触发了');
    }, 1000);
  },[]);

  const clearTimer = () => {
    clearInterval(timer.current);
  }

  function clickHandle(){
    console.log(timer);
    setCounter(counter + 1);
  }

  return (
    <>
      <div>{counter}</div>
      <button onClick={clickHandle}>+1</button>
      <button onClick={clearTimer}>停止</button>
    </>)
}

export default App;
```

useRef和createRef有什么区别？

useRef是内部使用了fiber，所以每次组件更新值都不会改变；createRef组件每更新一次都会重新创建一个新的ref

useRef一般用于函数组件 createRef一般用于类组件


## Context

### Context要解决的问题

解决组件之间数据共享的问题，避免一层一层的传递，避免通过中间组件传递数据

redux的原理就是基于Context所进行的一层封装

### Context的用法

1. 基础用法

Provider + Consumer

```js
// src/context/index.js
import { createContext } from "react";

export default createContext()
```

```js
// App.jsx
import './App.css';
import MyContext from './context/index'
import { useState } from 'react';

const { Provider } = MyContext

function App() {
  const [count, setCount] = useState(1)

  return (
    <div className="App">
      <Provider value={{count, setCount}}>
        <Context></Context> 
      </Provider>
    </div>
  );
}

export default App;

```


```js
// src/components/Context.jsx
import React from 'react'
import ContextChild1 from './ContextChild1'
import ContextChild2 from './ContextChild2'
import ContextChild3 from './ContextChild3'
import ContextChild4 from './ContextChild4'


export default function Context() {

  return (
    <div>
      Context
      <ContextChild1></ContextChild1>
      <ContextChild2></ContextChild2>
      <ContextChild3></ContextChild3>
      <ContextChild4></ContextChild4>
    </div>
  )
}


// src/components/ContextChild1.jsx
import React from 'react'

import MyContext from '../context/index'

const { Consumer } = MyContext

export default function ContextChild1() {
  return (
    <div>
      <Consumer>
        {
          (context) => (
            <div onClick={() => context.setCount(context.count + 1)}>
              {context.count}
            </div>
          )
        }
      </Consumer>
    </div>
  )
}

```

2. Context提供默认值

如果要在组件内使用默认值，那么提供数据的父组件就不能用Provider包裹了，否则显示不出

```js
// src/context/index.js
import { createContext } from "react";

export default createContext({
  name: 'zs',
  age: 18
})
```

3. Context的名字默认是Context，可以使用displayName更改

```js
import { createContext } from "react";

export const MyContext =  createContext({
  name: 'zs',
  age: 18
})

MyContext.displayName = 'MyCount'
```

4. 多个上下文环境

上下文可嵌套使用

### Context相关Hook

useContext，可以代替Consumer,父组件提供数据还是要通过Provider包裹

```js
// src/components/ContextChild4.jsx
import React, { useContext } from 'react'
import { MyContext } from '../context/index'

export default function ContextChild4(props) {

  const { a, b, c } = useContext(MyContext)

  return (
    <div>
      useContext用法：
      <div>a:{a}</div>
      <div>b:{b}</div>
      <div>c:{c}</div>
    </div>
  )
}

```


## render props

## Portals

提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀的方案

语法：`ReactDOM.createPortal(child, container)` 

child为任何可渲染的react子元素，container是一个DOM元素

1. 什么场景下用Portals

模态框场景

2. 如何使用Portals

```js
// src/components/Portals.jsx
import React from 'react'
import { createPortal } from 'react-dom'

export default function Portals() {
  return createPortal((
    <div
      style={{
          width: "450px",
          height: "250px",
          border: "1px solid",
          position: "absolute",
          left: "calc(50% - 225px)",
          top: "calc(50% - 125px)",
          textAlign: "center",
          lineHeight: "250px"
      }}
    >
      模态框
    </div>
  ), document.getElementById('modal'))
}

```

3. 通过Portals进行事件冒泡

虽然被渲染到了指定的dom中，但是冒泡是按照组件树来的

## 错误边界

## 组件渲染性能优化

1. shouldComponentUpdate 与 PureComment

2. React.memo

3. useCallback

4. useMemo


# 第二章

## useMemo和useCallback

使用useCallback最终会得到一个缓存的函数，该缓存函数会在依赖项发生变化时再更新

useMemo缓存的是一个值，这个值会在依赖项发生变化的时候重新进行计算并缓存

useCallback内部会将函数和依赖项一起缓存到hook对象的memoizedState属性上，在组件更新阶段，首先会拿到之前的hook对象，从之前的hook对象的memoized属性上获取到之前的依赖项，对比依赖项是否相同，如果相同则返回之前的callback，如果不相同则重新缓存，并返回新的callback

useMemo内部会将传入的函数执行并得到计算值，将计算值和依赖项目存储到hook对象的memoizedState中，最后向外部返回计算得到的值。更新时首先从updateWorkInProgressHook上拿到之前的hook对象，从而获取到之前的依赖值，和新传入的依赖项进行一个对比，如果相同，就返回上一次的计算值，如果不相同则重新调用传入的函数得到新的计算值并缓存，最后向外部返回新的计算值  

## useRef是干什么的？ref的工作流程是怎样的？什么叫做ref的失控？如何防止失控？

## 前端框架的理解

在早期使用jquery时代，那时的开发人员需要手动的去操作DOM节点，那个时候流行的还是MPA的模式，各个页面的代码量还在能够接受的范围

但是随着单页面应用的流行，客户端的js代码量出现井喷，此时如果还是采用传统的手动操作DOM的方式，对于开发人员来说有非常大的心智负担

此时就出现了能够基于状态声明式渲染以及提供组件化开发模式的库，例如Vue和React。这两者本质上仅仅是构建UI的库，但是随着应用的复杂度的提升，还需要前端路由方案、状态管理方案，所以有了vue-router、react-router、vuex、redux等周边生态产品

Vue/React和这些周边生态产品共同构成了一个技术栈，现在我们将React和Vue称之为框架，这可以算是一种约定俗成的说法

一款现代的前端框架，在它本身以及周边生态中，至少要包含以下几个方面：

- 基于状态的声明式渲染
- 支持组件化开发
- 客户端路由方案
- 状态管理方案

## React和Vue是如何描述界面的？有一些什么样的区别？ 

在React中使用jsx来描述UI，因为React团队认为UI本质上与逻辑存在耦合部分，作为前端工程师，js是用的最多的，如果同样使用js来描述UI，就可以让UI和逻辑配合的更密切。
 
使用js来描述页面，可以更加灵活，主要体现在：

- 可以在if语句和for循环中使用jsx
- 可以将jsx赋值给变量
- 可以把jsx当作参数传入，以及在函数中返回jsx

而模板语言的历史则需要从后端说起。早期在前后端分离时代，后端有各种各样的模板引擎，其本质是为了拓展HTML，在HTML中加入逻辑相关的语法，之后再动态的添加数据进去，如果单看vue中的模板语法，实际上和后端语言中的各种模板引擎是非常相似的。

总结起来就是：

模板语法的出发点是，既然前端框架使用HTML来描述UI，那么就扩展HTML语法，使它能够描述逻辑，也就是从UI出发，扩展UI，在UI中能够描述逻辑

而jsx出发点是，既然前端使用js来描述逻辑，那么就扩展js语法，让它能够描述UI，也就是“从逻辑出发，扩展逻辑，描述UI”。

虽然这两者都达到了同样的目的，但是对框架的实现产生了不同的影响

## 框架的分类

Q：

现代前端框架不仅仅是React、Vue，还出现了像Svelte、Solid.js之类的框架，你觉得这些新框架相比React、Vue有什么样的区别？

A：

所有的现代前端框架，都有一个非常重要的特点，那就是“基于状态的声明式渲染”。概括成公式就是UI = f(state)

这里有一点类似于初中数学中自变量与因变量之间的关系。例如在上面公式中,state就是一个自变量，state的变化会导致UI的变化

不同的框架，在根据自变量的变化计算出UI的变化这一步骤有所区别，自变量和x（应用、组件、UI）的对应关系，随着x抽象的层级不断下降，“自变量到UI变化”的路径则不断增多。路径越多，则意味着前端框架在运行时消耗在寻找“自变量与UI的对应关系”上的时间越少

以“自变量建立对应关系的抽象层级”可以作为其分类的依据，按照这个标准，前端框架可以分为三类：

- 元素级框架
- 组件级框架
- 应用级框架

以常见的框架为例，React属于应用级框架，Vue属于组件级框架，Solid.js、Svelte属于元素级框架


## 虚拟DOM

什么是虚拟DOM？它的优点有哪些？

虚拟DOM最早是由React团队提出的概念，这是一种编程思想，指的是针对真实UI DOM的一种描述能力

在React中，使用了js对象来描述真实的DOM结构。虚拟DOM和js对象之间的关系：前者是一种思想，后者是对思想的具体实现

why? 使用虚拟DOM的优点:

- 相较于DOM的体积和速度优势
- 多平台渲染的抽象能力

就算我使用了虚拟DOM，但是最终还要转换为真实DOM，不是增加了操作吗？

首次渲染页面的时候虚拟DOM比真实DOM多了一层js的操作，所以首次渲染页面会慢，虚拟DOM发挥优势是在更新的时候，虚拟DOM能够做到针对DOM节点做最小程度的修改

## React整体架构，新的Fiber架构相较于之前Stack架构有什么优势？

标准回答：

Stack架构在进行虚拟DOM树比较的时候，采用的是递归，计算会消耗大量的时间，新的Fiber架构采用的是链表，可以实现时间切片，防止js的计算占用过多的时间从而导致浏览器出现丢帧的现象

扩充回答：

React v15以及之前的架构称之为Stack架构，从v16开始，重构了整体的架构，重构后的架构为Fiber架构，新的架构有一个最大的特点就是能够实现时间切片

Stack架构：

- Reconciler（协调器）：VDOM 的实现，负责根据自变量变化计算出 UI 变化
- Renderer（渲染器）：负责将 UI 变化渲染到宿主环境中

这种架构称之为 Stack 架构，在 Reconciler 中，mount 的组件会调用 mountComponent，update 的组件会调用 updateComponent，这两个方法都会递归更新子组件，更新流程一旦开始，中途无法中断。

但是随着规模的逐渐扩大，之前的架构无法再满足快速响应的条件

1. CPU瓶颈：由于VDOM在进行差异比较时，采用的是递归的方式，js计算会消耗大量的时间，从而导致动画、还有一些需要实时更新的内容产生视觉上的卡顿
2. I/O 瓶颈：由于各种基于“自变量”变化而产生的更新任务没有优先级的概念，因此在某些更新任务（例如文本框的输入）有稍微的延迟，对于用户来讲也是非常敏感的，会让用户产生卡顿的感觉。

如何解决？

新的Fiber架构增加了Scheduler（调度器）：调度任务的优先级，高优先级任务会优先进入到 Reconciler，解决了旧架构中的I/O问题

通过一个对象来描述一个 DOM 节点，但是和之前方案不同的地方在于，每个 Fiber 对象之间通过链表的方式来进行串联。通过 child 来指向子元素，通过 sibling 指向兄弟元素，通过 return 来指向父元素。

Reconciler 中的更新流程从递归变为了“可中断的循环过程”。每次循环都会调用 shouldYield 判断当前的 TimeSlice 是否有剩余时间，没有剩余时间则暂停更新流程，将主线程还给渲染流水线，等待下一个宏任务再继续执行。这样就解决了 CPU 的瓶颈问题。


## 是否了解过React的整体渲染流程? 里面主要有哪些阶段？

React整体渲染流程可以分为两大阶段，分别的是render和commit

render阶段会经由调度器和协调器处理，此过程是在内存中运行，是异步可中断的

commit阶段会由渲染器进行处理，根据副作用进行UI的更新，此过程是同步不可中断的，否则会造成UI和数据显示不一致

**调度器**

调度器的主要作用是调度任务，让所有的任务有优先级的概念，这样的话紧急的任务可以优先执行，Scheduler实际上在浏览器的API中是有原生实现的，这个API叫做[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback),但是由于兼容性的问题，React团队自己实现了一套这样的机制，并且后期会把Scheduler这个包单独的进行发布，变成一个独立的包，不仅在React当中可以使用，如果有其他项目设计到任务调度，也可以使用

**协调器**

协调器是render的第二阶段工作，该阶段会采用深度优先的原则遍历并且创建一个一个的FiberNode，并将其串联在一起，在遍历时分为了“递”和“归”两个阶段，其中“递”阶段会执行bigWork方法，该方法会根据传入的FiberNode创建下一级FiberNode。而“归”阶段则会执行CommpleteWork方法，做一些副作用的收集

**渲染器**

渲染器的主要工作就是将各种副作用（flags表示）commit到宿主环境的UI中，整个阶段可以分为三个子阶段，分别是BeforeMutation阶段、Mutation阶段和Layout阶段


## Fiber的理解以及Fiber双缓冲

Fiber可以从三个方面去理解：

- FiberNode作为一种架构
- FiberNode作为一种数据类型
- FiberNode作为动态的工作单元

Fiber双缓冲指的就是在内存中构建两棵树，并直接在内存中进行替换的技术。在React中使用Wip Fiber Tree和Current Fiber Tree这两棵树来实现更新的逻辑，WipFiberTree在内存中完成更新，而CurrentFiberTree是最终要渲染的树，两棵树通过alternate指针相互指向，这样在下一次渲染的时候，直接复用Wip FiberTree作为下一次的渲染树，而上一次的渲染树又作为新的WipFiberTree，这样可以加快DOM节点的替换和更新


