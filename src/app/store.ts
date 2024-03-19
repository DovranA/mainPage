import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/mainSlice'
import videoSlice from '../features/videoSlice'
export const store = configureStore({
  reducer: {
    main: mainReducer,
    videos: videoSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
