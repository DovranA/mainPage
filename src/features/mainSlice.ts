import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
export type carousel = {
  id: number
  images: { img: string }[] | undefined
  name: string
  external_link: string
  internal_link: string
  main_page_banner: boolean
  top_hashaplar_page_banner: boolean
  top_videos_page_banner: boolean
  trends_page_banner: boolean
  contactus_page_banner: boolean
  start: string
  end: string
}
export type top = {
  position?: string | null
  image: string | null
  total: number | null
}
type Saylananlar = {
  position: 'center' | null
  total: number | null
  details: SaylananlarDetail[]
}

export type SaylananlarDetail = {
  user_id: number | null
  username: string | null
  total_videos: number | null
  videos: Video[]
}

export type Video = {
  id: number | null
  videofile: string | null
  image_path: string | null
  tags: Tag[]
  subcategory: string | null
  username: string | null
  user_avatar: string | null
  title: string | null
  description: string | null
  location: string | null
  chekedStatus: boolean | null
  cancel: boolean | null
  duration: string | null
  pinned: boolean | null
  pinned_start_date: string | null
  pinned_end_date: string | null
  view_count: number | null
  share_count: number | null
  like_count: number | null
  share_token: string | null
  download_count: number | null
  posted_at: string | null
  created_at: string | null
  updated_at: string | null
  is_active: boolean | null
  trend: boolean | null
  is_vertical: boolean | null
  user: number | null
  category: number | null
  brands: null
}

interface Tag {
  id: number | null
  name: string | null
}
export type PinnedVideos = {
  total: number
  detail: PinnedVideoDetail[] | null
}

export type PinnedVideoDetail = {
  id: number | null
  videofile: string | null
  image_path: string | null
  title: string | null
  description: string | null
  location: string | null
  chekedStatus: boolean | null
  cancel: boolean | null
  duration: string | null
  pinned: true | null
  pinned_start_date: string | null
  pinned_end_date: string | null
  view_count: number | null
  share_count: number | null
  like_count: number | null
  share_token: string | null
  download_count: number | null
  posted_at: string | null
  created_at: string | null
  updated_at: string | null
  is_active: boolean | null
  trend: boolean | null
  is_vertical: boolean | null
  user: number | null
  category: number | null
  subcategory: number | null
  brands: null
  tags: number[] | null
}

type main = {
  banner: carousel | null
  topusers: top | null
  saylananlar: Saylananlar | null
  topvideos: top | null
  trends: top | null
  brands: top | null
  totalvideos: top | null
  pinnedVideos: PinnedVideos | null
  loading: boolean
  error: any
  top: any
}
const initialState: main = {
  banner: null,
  brands: null,
  pinnedVideos: null,
  saylananlar: null,
  topusers: null,
  topvideos: null,
  totalvideos: null,
  trends: null,
  loading: false,
  error: null,
  top: null,
}

export const handleFetch = createAsyncThunk<any, any>('main', async () => {
  try {
    const res = await axios.get('http://95.85.127.108/api/videos/mainpage')
    // const res = await axios.get('http://localhost:8000/')
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
})

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetch.pending, (state) => {
        ;(state.loading = true), (state.error = null)
      })
      .addCase(handleFetch.fulfilled, (state, action) => {
        state.loading = false
        state.banner = action.payload.banner
        state.brands = action.payload.brands
        state.pinnedVideos = action.payload.pinnedVideos
        state.saylananlar = action.payload.saylananlar
        state.topusers = action.payload.topusers
        state.topvideos = action.payload.topvideos
        state.totalvideos = action.payload.totalvideos
        state.trends = action.payload.trends
      })
      .addCase(handleFetch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default mainSlice.reducer

export const SelectBanner = (state: RootState) => state.main.banner
export const SelectTopUser = (state: RootState) => state.main.topusers
export const SelectSaylananlar = (state: RootState) => state.main.saylananlar
export const SelectTrends = (state: RootState) => state.main.trends
export const SelectBrands = (state: RootState) => state.main.brands
export const SelectTopVideos = (state: RootState) => state.main.topvideos
export const SelectTotalVideos = (state: RootState) => state.main.totalvideos
export const SelectPinnedVideos = (state: RootState) => state.main.pinnedVideos
