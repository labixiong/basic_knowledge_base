import React from 'react'
import { MyContext } from '../context/index'

const { Consumer } = MyContext

export default function ContextChild2() {
  return (
    <div style={{ border: '1px solid' }}>
      默认值：
      <Consumer>
        {
          (context) => (
            <div>
              {context.name}
            </div>
          )
        }
      </Consumer>
    </div>
  )
}
