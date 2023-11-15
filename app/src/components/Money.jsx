import React from 'react'

export default function Money(props) {

  function handleInputChange(e) {
    // 将用户输入的值传递给父组件，让父组件进行修改
    props.transform(e.target.value)
  }

  return (
    <div>
      <fieldset>
        <legend>{props.text}</legend>
        <input type="text" value={props.money} onChange={handleInputChange} />
      </fieldset>
    </div>
  )
}
