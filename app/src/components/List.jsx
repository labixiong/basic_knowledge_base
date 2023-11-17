import React from 'react'
// import { delListAction, changeListAction } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { change, del } from '../redux/todoListSlice'

export default function List() {

  const { list } = useSelector(state => state.todo)
  const dispatch = useDispatch()

  const l = list.map((item, index) => {
    return (
      <li className='text-primary' key={index}>
        <span onClick={() => dispatch(change(index))} className={["item", item.status ? 'completed' : ''].join(" ")}>{item.content}</span>
        <button type='button' className='close' onClick={() => dispatch(del(index))}>&times;</button>
      </li>
    )
  })

  return (
    <div>
      {l}
    </div>
  )
}
