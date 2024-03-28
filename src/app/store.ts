import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/mainSlice'
import videoSlice from '../features/videoSlice'
export const store = configureStore({
  reducer: {
    main: mainReducer,
    videos: videoSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
