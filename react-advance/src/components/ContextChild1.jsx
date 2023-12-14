import React from 'react'

import { MyContext } from '../context/index'

const { Consumer } = MyContext

export default function ContextChild1() {
  return (
    <div style={{ border: '1px solid' }}>
      基础用法：
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
