import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    // 构造器,主要做一些初始化操作
    super()
    this.state = {

    }
  }

  // 会在组件挂载后(插入DOM树中),立即调用.
  // 依赖于DOM节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方
  componentDidMount() {
    console.log('mount');
  }

  // 销毁组件时触发
  componentWillUnmount() {}

  // 更新的时候立即调用
  componentDidUpdate() {}

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
