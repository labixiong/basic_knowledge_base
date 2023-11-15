import React from 'react'
import PropTypes from 'prop-types'

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

Hello.defaultProps = {
  stuInfo: {
    name: 'zs',
    age: 18
  }
}

Hello.propTypes = {
  stuInfo: PropTypes.object
}
