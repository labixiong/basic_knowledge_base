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
