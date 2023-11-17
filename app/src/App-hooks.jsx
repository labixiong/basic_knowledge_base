import React, { useState, useEffect } from 'react'
import useBook from './hooks/useBook'

export default function App() {
  let [count, setCount] = useState(0)
  let [count1, setCount1] = useState(0)
  let [count2, setCount2] = useState(0)
  let {book, setBook} = useBook()
  let [value, setValue] = useState()

  useEffect(() => {
    console.log('执行副作用函数');
  }, [count])

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleClick() {
    setBook(value)
  }

  return (
    <div>
      <div>{count}</div>
      <div>{count1}</div>
      <div>{count2}</div>
      <button onClick={() => setCount(++count)}>+1</button>
      <button onClick={() => setCount1(++count1)}>+1</button>
      <button onClick={() => setCount2(++count2)}>+1</button>

      {/* 自定义hook测试 */}
      <div>{book}</div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick}>确定</button>
    </div>
  )
}
