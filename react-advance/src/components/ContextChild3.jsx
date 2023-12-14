import React from 'react'
import { MyContext, MyContext2 } from '../context/index'

export default function ContextChild3() {
  return (
    <div style={{ border: '1px solid red' }}>
      多层嵌套用法：
      <MyContext.Consumer>
        {
          (context) => {
            return (
              <MyContext2.Consumer>
                {
                  (context2) => (
                    <div>
                      <div>{context.a}</div>
                      <div>{context.b}</div>
                      <div>{context.c}</div>
                      <div>{context2.a}</div>
                      <div>{context2.b}</div>
                      <div>{context2.c}</div>
                    </div>
                  )
                }
              </MyContext2.Consumer>
            )
          }
        }
      </MyContext.Consumer>
    </div>
  )
}
