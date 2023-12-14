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
