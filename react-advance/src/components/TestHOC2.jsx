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

