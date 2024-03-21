import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import {
  PlayerOptions,
  SelectVideos,
  setChild,
  setDuringKey,
  setFullScreen,
  setPause,
  setVideoId,
  videoPlayerVisable,
} from '../../features/videoSlice'
import styles from './palyer.module.css'
import { video } from '../../features/mainSlice'
import { IoClose } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowUp, IoMdInformation } from 'react-icons/io'
import { TiArrowSortedUp } from 'react-icons/ti'
import { MdOutlineWbSunny, MdVolumeUp } from 'react-icons/md'
import { MdScreenRotation } from 'react-icons/md'
import { GoScreenFull } from 'react-icons/go'
import { FaHeart } from 'react-icons/fa'
import { PiShareFat } from 'react-icons/pi'
import { LuDownload } from 'react-icons/lu'
import { useEffect, useRef, useState } from 'react'
import VideoContent from './video'
const Player = () => {
  const dispatch = useAppDispatch()
  const options = useSelector(PlayerOptions)
  const videos = useSelector(SelectVideos)
  const [info, setInfo] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const videoSpace = useRef<HTMLDivElement>(null)
  // const [child, setChild] = useState<number>(options?.child)
  const [leftRigthKey, setLeftRightKey] = useState<string>('')

  const incChild = () => {
    if (options.child < videos?.length - 1)
      dispatch(setChild(options?.child + 1))
  }
  const decChild = () => {
    if (options.child > 0) dispatch(setChild(options?.child - 1))
  }
  const handleKeyDown = async (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        dispatch(setPause(!options.pause))
        break
      case 'ArrowUp':
        incChild()
        break
      case 'ArrowDown':
        decChild()
        break
      case 'ArrowLeft':
        dispatch(setDuringKey('left'))
        break
      case 'ArrowRight':
        dispatch(setDuringKey('right'))
        break
    }
  }
  useEffect(() => {
    // playerRef.current?.children[0]?.scrollIntoView({})
    videoSpace.current?.focus()
  }, [])
  useEffect(() => {
    playerRef.current?.children[options.child]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    })
    dispatch(setVideoId(videos[options.child]?.id))
  })

  return (
    <div
      className={styles.playerMain}
      tabIndex={-1}
      ref={videoSpace}
      onKeyDown={handleKeyDown}
      onKeyUp={() => {
        dispatch(setDuringKey(''))
      }}
    >
      <span className={styles.videoSpace}>
        <div className={styles.app__videos} ref={playerRef}>
          {videos.map((video: video, idx: number) => {
            return <VideoContent videocontent={video} key={idx} />
          })}
        </div>
        <div className={`${styles.controllers} ${styles.controllersLeft}`}>
          <span
            className={styles.videoBtn}
            onClick={() => {
              dispatch(videoPlayerVisable(false))
              dispatch(setPause(true))
              dispatch(setChild(0))
            }}
          >
            <IoClose />
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersCenter}`}
          >
            <span className={styles.videoBtn} onClick={() => incChild()}>
              <IoIosArrowUp />
            </span>
            <span className={styles.videoBtn} onClick={() => decChild()}>
              <IoIosArrowDown />
            </span>
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersBottom}`}
          >
            <span className={styles.videoBtn}>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <TiArrowSortedUp style={{ marginBottom: '-10px' }} />
                <TiArrowSortedUp style={{ marginTop: '-10px' }} />
              </span>
            </span>
            <span className={styles.videoVolume}>
              <input
                type='range'
                max={25}
                className={`${styles.styledSlider} ${styles.sliderProgress}`}
                // style={{
                //   height: '100%',
                //   '--value': 75,
                //   '--min': 0,
                //   '--max': 100,
                // }}
              />
            </span>
            <span className={styles.videoBtn}>
              <MdVolumeUp />
            </span>
          </span>
        </div>
        <div className={`${styles.controllers} ${styles.controllersRight}`}>
          <span
            className={styles.videoBtn}
            // onClick={() => {
            //   setInfo(!info)
            // }}
          >
            <IoMdInformation />
          </span>
          <span className={`${styles.controllersGroup} ${styles.videoContent}`}>
            <span className={styles.videoContentItem}>
              <FaHeart
                className={styles.videoBtn}
                style={{
                  backgroundColor: 'transparent',
                  border: '3px solid red',
                  color: 'red',
                  padding: '3px',
                }}
              />
              <p className={styles.count}>25K</p>
            </span>
            <span className={styles.videoContentItem}>
              <PiShareFat
                className={styles.videoBtn}
                style={{
                  backgroundColor: 'transparent',
                  border: '3px solid green',
                  color: 'green',
                  padding: '3px',
                }}
              />
              <p className={styles.count}>25K</p>
            </span>
            <span className={styles.videoContentItem}>
              <LuDownload
                className={styles.videoBtn}
                style={{
                  backgroundColor: 'transparent',
                  border: '3px solid blue',
                  color: 'blue',
                  padding: '3px',
                }}
              />
              <p className={styles.count}>25K</p>
            </span>
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersBottom}`}
          >
            <span className={styles.videoBtn}>
              <MdScreenRotation />
            </span>
            <span className={styles.videoBtn}>
              <MdOutlineWbSunny />
            </span>
            <span
              className={styles.videoBtn}
              onClick={() => {
                dispatch(setFullScreen(!options.fullScreen))
              }}
            >
              <GoScreenFull />
            </span>
          </span>
        </div>
      </span>
      {options.fullScreen ? <span className={styles.infoSpace}></span> : <></>}
    </div>
  )
}

export default Player
