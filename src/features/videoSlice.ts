import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { video } from './mainSlice'
export type options = {
  pause: boolean
  videoId: number | null
  child: number
  fullScreen: boolean
  duringKey: string
}
type videoPlayer = {
  videos: video[]
  videoPlayer: boolean
  loading: boolean
  error: any
  from: string
  options: options
}

const initialState: videoPlayer = {
  videos: [],
  videoPlayer: false,
  loading: false,
  error: null,
  from: '',
  options: {
    pause: false,
    videoId: null,
    child: 0,
    fullScreen: false,
    duringKey: '',
  },
}
const videosSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setDuringKey: (state, action) => {
      state.options.duringKey = action.payload
    },
    setFullScreen: (state, action) => {
      state.options.fullScreen = action.payload
    },
    setVideoId: (state, action) => {
      state.options.videoId = action.payload
    },
    setChild: (state, action) => {
      state.options.child = action.payload
    },
    setPause: (state, action) => {
      state.options.pause = action.payload
    },
    setFirstVideo: (state, action) => {
      console.log(action.payload)
      // if (state.videos.length) {
      //   const findItem: video | undefined = state.videos.find(
      //     (item) => item.id === action.payload
      //   )
      //   const newArray = state.videos.filter(
      //     (item) => item.id != action.payload
      //   )
      //   state.videos = [findItem, ...newArray]
      // }
    },
    addVideos: (state, action) => {
      state.videos = action.payload?.videos
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
export const {
  videoPlayerVisable,
  addFromVideos,
  addVideos,
  setPause,
  setVideoId,
  setChild,
  setFirstVideo,
  setFullScreen,
  setDuringKey,
} = videosSlice.actions
export default videosSlice.reducer

export const SelectVideos = (state: RootState) => state.videos.videos
export const SelectFromVideos = (state: RootState) => state.videos.from
export const PlayerVisable = (state: RootState) => state.videos.videoPlayer
export const PlayerOptions = (state: RootState) => state.videos.options
