import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import image from '../assets/surat1.jpg'
type video = {
  thumbnail: string
}
type init = {
  video: video[]
}

const initialState: init = {
  video: [
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
    { thumbnail: image },
  ],
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCount: (state, action) => {
      console.log(action.payload)
    },
  },
})

export const { setCount } = videoSlice.actions

export default videoSlice.reducer

export const SelectVideo = (state: RootState) => state.videos.video
