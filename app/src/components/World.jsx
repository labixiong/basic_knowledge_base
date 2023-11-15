import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class World extends Component {
  // props的默认值
  static defaultProps =  {
    stuInfo: {
      name: 'ls',
      age: 20
    }
  }

  // props类型检测
  static propTypes = {
    name: PropTypes.string,
    stuInfo: PropTypes.object
  }

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
