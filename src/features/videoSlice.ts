import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { video } from './mainSlice'
type videoPlayer = {
  videos: video[]
  videoPlayer: boolean
  loading: boolean
  error: any
  from: string
}
const initialState: videoPlayer = {
  videos: [],
  videoPlayer: false,
  loading: false,
  error: null,
  from: '',
}
const videosSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addVideos: (state, action) => {
      // const videos = action.payload.videos
      // const itemIndex = videos.findIndex(
      //   (item: any) => item.id === action.payload.id
      // )
      // if (itemIndex === -1) {
      //   state.videos = videos
      // } else {
      //   const item = videos.splice(itemIndex, 1)[0]
      //   videos.unshift(item)
      //   state.videos = videos
      // }
      state.videos = action.payload
    },
    addFromVideos: (state, action) => {
      state.from = action.payload
    },
    videoPlayerVisable: (state, action) => {
      const body = document.body
      if (action.payload) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
        state.videos = []
        state.from = ''
      }
      state.videoPlayer = action.payload
    },
  },
})
export const { videoPlayerVisable, addFromVideos, addVideos } =
  videosSlice.actions
export default videosSlice.reducer

export const SelectVideos = (state: RootState) => state.videos.videos
export const SelectFromVideos = (state: RootState) => state.videos.from
export const PlayerVisable = (state: RootState) => state.videos.videoPlayer
