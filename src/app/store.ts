import { configureStore } from '@reduxjs/toolkit'
import testReducer from '../features/testSlice'
import videoReducer from '../features/videoSlice'
export const store = configureStore({
  reducer: {
    test: testReducer,
    videos: videoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
