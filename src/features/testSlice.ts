import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

type init = {
  count: number
}

const initialState: init = {
  count: 10,
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCount: (state) => {
      const count = state.count + 1
      state.count = count
    },
  },
})

export const { setCount } = testSlice.actions

export default testSlice.reducer

export const SelectCount = (state: RootState) => state.test.count
