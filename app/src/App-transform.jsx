/**
 * 汇率案例 - 理解状态提升
 */
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

