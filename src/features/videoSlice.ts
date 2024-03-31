import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { video } from './mainSlice'
import axios from 'axios'
export type options = {
  pause: boolean
  video: video | null
  child: number
  fullScreen: boolean
  duringKey: string
  fullWidth: boolean
  firstVideo: video | null | undefined
  mute: boolean
  volume: number
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
    child: 0,
    fullScreen: false,
    duringKey: '',
    video: null,
    fullWidth: false,
    firstVideo: null,
    mute: false,
    volume: 0.5,
  },
}

export const likeVideo = createAsyncThunk<any, any>(
  'like',
  async (id: number) => {
    console.log(id)
    try {
      const res = await axios.put(`/api/videos/${id}/like`, {
        withCredentials: true,
      })
      console.log(res)
      return res.data
    } catch (error) {
      console.log(error)
      return error
    }
  }
)
const videosSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setFirstVideo: (state, action) => {
      state.options.firstVideo = action.payload
    },
    setDuringKey: (state, action) => {
      state.options.duringKey = action.payload
    },
    setFullScreen: (state, action) => {
      state.options.fullScreen = action.payload
    },
    setOptionsVideo: (state, action) => {
      state.options.video = action.payload
    },
    setVideo: (state, action) => {
      const video = state.videos.find(
        (item: video) => item.id === action.payload
      )
      if (video) state.options.video = video
    },
    setChild: (state, action) => {
      state.options.child = action.payload
    },
    setPause: (state, action) => {
      state.options.pause = action.payload
    },
    addVideos: (state, action) => {
      if (action.payload?.id) {
        const findVideo: any = action.payload?.videos.find(
          (item: video) => item.id === action.payload?.id
        )
        const newVideo = action.payload.videos.filter(
          (item: video) => item.id != action.payload?.id
        )
        state.videos = [findVideo, ...newVideo]
      } else {
        state.videos = action.payload?.videos
      }
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
    setFullWidth: (state, action) => {
      state.options.fullWidth = action.payload
    },
    setLikeCount: (state, action) => {
      const { videoId, newVideoState } = action.payload
      const newVideos = [...state.videos]
      const index = state.videos.findIndex(
        (video: video) => video.id === videoId
      )
      if (newVideoState) {
        console.log('inc')
        newVideos[index].like_count = Number(newVideos[index].like_count) + 1
      } else {
        console.log('dec')
        newVideos[index].like_count = Number(newVideos[index].like_count) - 1
      }
      state.videos = newVideos
      // state.videos[index].like_count = newVideoCount
    },
    setMute: (state, action) => {
      state.options.mute = action.payload
    },
    setVolume: (state, action) => {
      state.options.volume = action.payload
    },
  },
})
export const {
  videoPlayerVisable,
  addFromVideos,
  addVideos,
  setPause,
  setChild,
  setFullScreen,
  setDuringKey,
  setVideo,
  setFirstVideo,
  setOptionsVideo,
  setLikeCount,
  setMute,
  setVolume,
} = videosSlice.actions
export default videosSlice.reducer

export const SelectVideos = (state: RootState) => state.videos.videos
export const SelectFromVideos = (state: RootState) => state.videos.from
export const PlayerVisable = (state: RootState) => state.videos.videoPlayer
export const PlayerOptions = (state: RootState) => state.videos.options
