import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import {
  PlayerOptions,
  SelectVideos,
  addVideos,
  setChild,
  setDuringKey,
  setLikeCount,
  setMute,
  setPause,
  setVideo,
  videoPlayerVisable,
} from '../../features/videoSlice'
import styles from './palyer.module.css'
import { setLikeCountMain, video } from '../../features/mainSlice'
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
import { CiSearch } from 'react-icons/ci'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import useDownloader from '../../hooks/useDownloader'
const Player = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const dispatch = useAppDispatch()
  const options = useSelector(PlayerOptions)
  const videos = useSelector(SelectVideos)
  const playerRef = useRef<HTMLDivElement>(null)
  const videoSpace = useRef<HTMLDivElement>(null)
  const incChild = () => {
    if (options.child < videos?.length - 1)
      dispatch(setChild(options?.child + 1))
  }
  const decChild = () => {
    if (options.child > 0) dispatch(setChild(options?.child - 1))
  }
  const likeVideoTest = async (id: number) => {
    try {
      const { data } = await axios.put(`/api/videos/${id}/like`)
      if (Number(options.video?.like_count) > Number(data)) {
        setScaleHeart(2)
      }
      if (Number(options.video?.like_count) < Number(data)) {
        setScaleHeart(0)
      }
      dispatch(
        setLikeCount({
          videoId: videos[options?.child].id,
          newVideoState: data.liked,
        })
      )
      dispatch(
        setLikeCountMain({
          videoId: videos[options?.child].id,
          newVideoCount: data.likeNum,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  const { addDownload, progress, controller, source } = useDownloader()
  const [scaleHeart, setScaleHeart] = useState<number>(2)
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
      case 'KeyM':
        dispatch(setMute(!options.mute))
        break
      case 'KeyD':
        setDarkMode(!darkMode)
        break
      case 'KeyL':
        likeVideoTest(Number(options.video?.id))
        break
    }
  }

  useEffect(() => {
    videoSpace.current?.focus()
    dispatch(setChild(0))
    setFullScreen(false)
  }, [])
  useEffect(() => {
    playerRef.current?.children[options.child]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    })
    dispatch(setVideo(videos[options.child]?.id))
  }, [options.child])
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
      <span
        className={styles.videoSpace}
        style={darkMode ? { backgroundColor: 'rgba(0, 0, 0, 0.742)' } : {}}
      >
        <span className={styles.search}>
          <input type='text' placeholder='Gozleg' />
          <CiSearch />
        </span>
        <div className={styles.app__videos} ref={playerRef}>
          {videos.map((video: video, idx: number) => {
            return (
              <VideoContent videocontent={video} key={idx} volume={volume} />
            )
          })}
        </div>
        <div className={`${styles.controllers} ${styles.controllersLeft}`}>
          <span
            className={styles.videoBtn}
            onClick={() => {
              dispatch(videoPlayerVisable(false))
              dispatch(addVideos({ videos: [] }))
              dispatch(setPause(true))
              dispatch(setChild(0))
            }}
            style={
              darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
            }
          >
            <IoClose />
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersCenter}`}
          >
            <span
              className={styles.videoBtn}
              onClick={() => incChild()}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <IoIosArrowUp />
            </span>
            <span
              className={styles.videoBtn}
              onClick={() => decChild()}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <IoIosArrowDown />
            </span>
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersBottom}`}
          >
            <span
              className={styles.videoBtn}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <TiArrowSortedUp style={{ marginBottom: '-10px' }} />
                <TiArrowSortedUp style={{ marginTop: '-10px' }} />
              </span>
            </span>
            <span
              className={styles.videoVolume}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <input
                type='range'
                max={1}
                value={volume}
                min={0}
                step={0.1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setVolume(Number(e.target.value))
                }}
                className={`${styles.styledSlider} ${styles.sliderProgress}`}
                style={
                  darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
                }
              />
            </span>
            <span
              className={styles.videoBtn}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
              onClick={() => {
                dispatch(setMute(!options.mute))
              }}
            >
              <MdVolumeUp />
            </span>
          </span>
        </div>
        <div className={`${styles.controllers} ${styles.controllersRight}`}>
          <span
            className={styles.videoBtn}
            style={
              darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
            }
          >
            <IoMdInformation />
          </span>

          {progress > 0 && (
            <AnimatePresence mode='popLayout'>
              <motion.span animate={{ x: -200 }} className={styles.downloadBox}>
                yuklenyar
                <div className={styles.progressControl}>
                  <progress
                    className={styles.progress}
                    value={progress}
                    max={100}
                  ></progress>
                  <span
                    className={styles.cancel}
                    onClick={() => {
                      setTimeout(() => {
                        controller.abort()
                        source.cancel()
                      }, 150)
                      console.log('test')
                    }}
                  >
                    <IoClose />
                  </span>
                </div>
              </motion.span>
            </AnimatePresence>
          )}
          <span className={`${styles.controllersGroup} ${styles.videoContent}`}>
            <span
              className={styles.videoContentItem}
              onClick={() => {
                likeVideoTest(Number(options.video?.id))
              }}
            >
              <motion.span
                initial={{
                  scale: 1,
                }}
                whileTap={{
                  scale: scaleHeart,
                }}
                transition={{ duration: 0.3 }}
              >
                <FaHeart
                  className={styles.videoBtn}
                  style={{
                    backgroundColor: 'transparent',
                    border: '3px solid red',
                    color: 'red',
                    padding: '3px',
                  }}
                />
              </motion.span>
              <p className={styles.count}>{videos[options.child].like_count}</p>
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
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `http://storage.tmbiz.info/api/videos/${options?.video?.id}?share=${options?.video?.share_token}`
                    )
                    .then(() => {
                      console.log('copyed')
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }}
              />
              <p className={styles.count}>{options.video?.share_count}</p>
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
                onClick={() => {
                  addDownload(
                    `https://dev.tmbiz.info/api/videos/${options.video.id}/download`
                  )
                }}
              />
              <p className={styles.count}>{options.video?.download_count}</p>
            </span>
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersBottom}`}
          >
            {!options.video?.is_vertical && (
              <span
                className={styles.videoBtn}
                style={
                  darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
                }
              >
                <MdScreenRotation />
              </span>
            )}
            <span
              className={styles.videoBtn}
              onClick={() => {
                setDarkMode(!darkMode)
              }}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <MdOutlineWbSunny />
            </span>
            <span
              className={styles.videoBtn}
              onClick={() => {
                setFullScreen(!fullScreen)
              }}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
              <GoScreenFull />
            </span>
          </span>
        </div>
      </span>
      {fullScreen && (
        <motion.span
          // initial={{
          //   width: '100%',
          // }}
          animate={{
            x: '0',
            // width: '100%',
          }}
          exit={{
            x: '100%',
          }}
          transition={{
            delay: 0.4,
            ease: 'easeInOut',
          }}
          className={styles.infoSpace}
          style={darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}}
        ></motion.span>
      )}
    </div>
  )
}

export default Player
