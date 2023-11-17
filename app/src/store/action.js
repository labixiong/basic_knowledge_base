// 生产action对象的函数，一般称之为actionCreator

import { ADD, DEL, CHANGE } from './actionType'

export const addListAction = (newItem) => ({
  type: ADD,
  data: newItem
})

export const delListAction = (index) => ({
  type: DEL,
  data: index
})

export const changeListAction = (index) => ({
  type: CHANGE,
  data: index
})