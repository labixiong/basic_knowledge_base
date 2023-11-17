import React, { useState } from 'react'
// import { addListAction } from '../store/action'
import { useDispatch } from 'react-redux'
import { add } from '../redux/todoListSlice'

export default function Input() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  function handleClick() {
    // 点击提交之后将数据存储到仓库中
    dispatch(add(value))
    setValue("")
  }

  return (
    <div className='form-inline'>
      <input style={{ marginRight: 10 }} type="text" className='form-control' placeholder='请输入待办事项' value={value} onChange={(e) => setValue(e.target.value)} />
      <button className='btn btn-primary' onClick={handleClick}>提交</button>
    </div>
  )
}
