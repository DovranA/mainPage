import Video from './Video/video'
import styles from './videos.module.css'
type video = {
  thumbnail: string
}
type Param = {
  videos: video[]
}

const Videos = ({ videos }: Param) => {
  return (
    <div className={styles.videos}>
      {videos.map((item: video, idx: number) => {
        return <Video video={item} key={idx} />
      })}
    </div>
  )
}

export default Videos
