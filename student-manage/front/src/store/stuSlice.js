import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStuListApi, deleteStuByIdApi, addStuApi, editStuByIdApi } from '../api/index'

// 异步操作获取数据
export const getStuListAsync = createAsyncThunk("stu/getStuListAsync", async (_, thunkApi) => {
  // 发送ajax请求
  const res = await getStuListApi()
  // console.log(res);

  // 派发action, res.data就会作为payload
  thunkApi.dispatch(initStuList(res.data))
})

// 异步删除单个学生
export const delStuByIdAsync = createAsyncThunk('stu/delStuByIdAsync', async(payload, thunkApi) => {
  await deleteStuByIdApi(payload)

  thunkApi.dispatch(delStuById(payload))
})

// 异步新增单个学生
export const addStuAsync = createAsyncThunk('stu/addStuAsync', async(payload, thunkApi) => {
  const res = await addStuApi(payload)

  thunkApi.dispatch(addStu(res.data))
})

// 异步编辑单个学生
export const editStuByIdAsync = createAsyncThunk('stu/editStuByIdAsync', async(payload, thunkApi) => {
  await editStuByIdApi(payload.id, payload.stu)
  thunkApi.dispatch(editStuById(payload))
})


export const stuSlice = createSlice({
  name: 'stu',
 
  initialState: {
    stuList: []
  },

  reducers: {
    // 初始化学生列表
    initStuList: (state, { payload }) => {
      state.stuList = payload
    },

    delStuById: (state, { payload }) => {
      for (let i = 0; i < state.stuList.length; i++) {
        if(state.stuList[i].id === ~~payload) {
          state.stuList.splice(i, 1)
          break
        }
      }
    },

    addStu: (state, { payload }) => {
      state.stuList.push(payload)
    },

    editStuById: (state, { payload: { id, stu } }) => {
      for (let i = 0; i < state.stuList.length; i++) {
        if(state.stuList[i].id === ~~id) {
          state.stuList[i] = stu
          break
        }
      }
    }
  }
})

export const { initStuList, delStuById, addStu, editStuById } = stuSlice.actions

export default stuSlice.reducer
