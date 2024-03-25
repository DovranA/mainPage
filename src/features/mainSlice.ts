import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
export type carousel = {
  id: number | null | undefined
  images: { img: string | null | undefined }[] | undefined
  name: string | null | undefined
  external_link: string | null | undefined
  internal_link: string | null | undefined
  main_page_banner: boolean | null | undefined
  top_hashaplar_page_banner: boolean | null | undefined
  top_videos_page_banner: boolean | null | undefined
  trends_page_banner: boolean | null | undefined
  contactus_page_banner: boolean | null | undefined
  start: string | null | undefined
  end: string | null | undefined
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
  id: number | null
  name: string | null
  image: string | null
  total_views: number | null
  video_count: number | null
  created_at: string | null
}

export type video = {
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
  like_count: number | null | undefined
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
    const res = await axios.get('/api/videos/mainpage', {
      withCredentials: true,
    })
    console.log(res)
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
        const data = action.payload
        console.log(data)
        state.banner = data?.banner
        state.brands = data?.brands
        state.pinnedVideos = data?.pinnedVideos
        state.saylananlar = data?.saylananlar
        state.topusers = data?.topusers
        state.topvideos = data?.topvideos
        state.totalvideos = data?.totalvideos
        state.trends = data?.trends
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
