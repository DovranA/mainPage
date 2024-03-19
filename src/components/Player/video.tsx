import { useRef, useState } from 'react'
import styles from './palyer.module.css'
type Props = {
  videofile: string | null
}
const Video = ({ videofile }: Props) => {
  const [playing, setPlaying] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const handleVideoPress = () => {
    console.log(playing)
    console.log(videoRef)
    if (playing) {
      setPlaying(false)
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
      setPlaying((play) => !play)
    }
  }

  return (
    <div className={styles.video}>
      <video
        className={styles.video__player}
        onClick={() => handleVideoPress()}
        loop
        ref={videoRef}
      >
        <source src={'http://' + videofile} type='video/mp4'></source>
      </video>
    </div>
  )
}

export default Video
