import { useEffect, useRef, useState } from 'react'
import styles from './palyer.module.css'
import { video } from '../../features/mainSlice'
import { useSelector } from 'react-redux'
import { PlayerOptions, setPause, setVideo } from '../../features/videoSlice'
import { useAppDispatch } from '../../app/hooks'
type Props = {
  videocontent: video | null
}
const Video = ({ videocontent }: Props) => {
  const options = useSelector(PlayerOptions)
  const dispatch = useAppDispatch()
  const [progress, setProgress] = useState<number>(0)
  const [videoTime, setVideoTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    setVideoTime(Number(videoRef.current?.duration))
    setProgress(0)
    dispatch(setVideo(options.firstVideo?.id))
  }, [])
  useEffect(() => {
    if (options.duringKey === 'right') {
      if (videoRef.current) {
        videoRef.current.currentTime += 5
      }
    }
    if (options.duringKey === 'left') {
      if (videoRef.current) {
        videoRef.current.currentTime -= 5
      }
    }
  }, [options.duringKey])
  useEffect(() => {
    if (!options.pause && videocontent?.id === options?.video?.id) {
      videoRef.current?.play()
      setVideoTime(Number(videoRef.current?.duration))
    } else {
      videoRef.current?.pause()
      setVideoTime(Number(videoRef.current?.duration))
    }
    setInterval(() => {
      setCurrentTime(Number(videoRef.current?.currentTime))
    }, 1000)
  })
  useEffect(() => {
    setProgress((currentTime / videoTime) * 100)
  }, [currentTime])
  const handleVideoPress = () => {
    dispatch(setPause(!options.pause))
  }
  const handleProgress = (e: any) => {
    console.log(e.target.value)
    const newTime = Math.min(
      Math.max((videoTime / 100) * e.target.value, 0),
      videoTime
    )
    setProgress(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }
  return (
    <div className={styles.video} id={String(videocontent?.id)}>
      <video
        onFocus={() => {
          console.log('first')
        }}
        className={
          videocontent?.is_vertical
            ? `${styles.video__player} ${styles.fitWidth}`
            : `${styles.video__player} ${styles.fullWidth}`
        }
        onClick={() => handleVideoPress()}
        loop
        ref={videoRef}
      >
        <source src={String(videocontent?.videofile)} type='video/mp4'></source>
      </video>
      <span
        className={
          videocontent?.is_vertical
            ? `${styles.videoDurSlice} ${styles.fitWidth}`
            : `${styles.videoDurSlice} ${styles.fullWidth}`
        }
      >
        <span className={styles.duration}>
          {Math.floor(currentTime / 60) +
            ':' +
            ('0' + Math.floor(currentTime % 60)).slice(-2)}
        </span>
        <input
          type='range'
          max={100}
          value={progress}
          className={styles.slice}
          onChange={handleProgress}
        />
      </span>
    </div>
  )
}

export default Video
