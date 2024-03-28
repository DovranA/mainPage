export type ErrorWithMessage = {
  status: number
  data: {
    message: string
  }
}

export type Video = {
  id: number | null
  videofile: string | null
  image_path: string | null
  tags: { id: number | null; name: string | null }[]
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
export type Saylananlar = {
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

export interface Tag {
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

export type main = {
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
