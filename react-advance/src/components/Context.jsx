import React from 'react'
import ContextChild1 from './ContextChild1'
import ContextChild2 from './ContextChild2'
import ContextChild3 from './ContextChild3'
import ContextChild4 from './ContextChild4'


export default function Context() {

  return (
    <div style={{ border: '1px solid', width: 200, padding: 10 }}>
      Context
      <ContextChild1></ContextChild1>
      <ContextChild2></ContextChild2>
      <ContextChild3></ContextChild3>
      <ContextChild4></ContextChild4>
    </div>
  )
}
