import { PinnedVideoDetail, PinnedVideos } from '../../features/mainSlice'
import Video from './Video/video'
import styles from './videos.module.css'
type Param = {
  videos: PinnedVideos | null
}

const Videos = ({ videos }: Param) => {
  return (
    <div className={styles.videos}>
      {videos?.detail?.map((item: PinnedVideoDetail, idx: number) => {
        return <Video video={item} key={idx} />
      })}
    </div>
  )
}

export default Videos
