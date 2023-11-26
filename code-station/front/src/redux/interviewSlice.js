import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInterview } from '../api/interview'

export const getInterviewAsync = createAsyncThunk('interview/getInterviewAsync', async (_, thunkApi) => {
  const res = await getInterview()
  // console.log(res.data);
  thunkApi.dispatch(initInterviewTitleList(res.data))
})

const interviewSlice = createSlice({
  name: 'interview',

  initialState: {
    interviewTitleList: []
  },

  reducers: {
    initInterviewTitleList: (state, { payload }) => {
      state.interviewTitleList = payload
    }
  }
})

const { initInterviewTitleList } = interviewSlice.actions
export default interviewSlice.reducer
