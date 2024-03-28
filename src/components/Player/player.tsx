import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import {
  PlayerOptions,
  SelectVideos,
  addVideos,
  likeVideo,
  setChild,
  setDuringKey,
  setFullScreen,
  setLikeCount,
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
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { duration } from 'moment'
const Player = () => {
  const { id } = useParams()
  useEffect(() => {
    console.log(id)
  }, [id])
  const [darkMode, setDarkMode] = useState(false)
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
  // useEffect(() => {
  //   dispatch(setVideo(videos[0].id))
  // }, [videos])
  const [scaleHeart, setScaleHeart] = useState<number>(2)
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
          newVideoCount: data.likeNum,
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
  useEffect(() => {
    videoSpace.current?.focus()
    dispatch(setChild(0))
  }, [])
  useEffect(() => {
    playerRef.current?.children[options.child]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    })
    dispatch(setVideo(videos[options.child]?.id))
  }, [options.child])
  const [progress, setProgress] = useState(0)
  let downStop = false
  const handleDownload = async (id: number) => {
    if (downStop) {
      console.log('Download stopped.')
      setTimeout(() => {
        downStop = false
      }, 150)
      return
    }
    try {
      const response = await fetch(
        `https://dev.tmbiz.info/api/videos/${id}/download`
      )
      if (!response?.body) return
      const contentLengh = response.headers.get('Content-Length')
      const totalLength =
        typeof contentLengh === 'string' && parseInt(contentLengh)
      console.log('totalLength', totalLength)
      const reader = response.body.getReader()
      const chunks = []
      let receivedLength = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log('done')
          axios
            .put(`https://dev.tmbiz.info/api/videos/${id}/downloadcount`)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
          setProgress(0)
          downStop = false
          break
        }
        chunks.push(value)
        receivedLength += value.length
        if (typeof totalLength === 'number') {
          const step = Math.round((receivedLength / totalLength) * 100)
          setProgress(step)
        }
      }
      const blob = new Blob(chunks)

      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `tmbiz-${Date.now()}.mp4`
      const handleClick = () => {
        setTimeout(() => {
          URL.revokeObjectURL(url)
          a.removeEventListener('click', handleClick)
        }, 150)
      }
      a.addEventListener('click', handleClick, false)
      a.click()
      downStop = false
    } catch (error) {
      console.log(error)
    }
  }
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
            return <VideoContent videocontent={video} key={idx} />
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
              dispatch(setFullScreen(true))
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
            <span className={styles.videoVolume}>
              <input
                type='range'
                max={25}
                className={`${styles.styledSlider} ${styles.sliderProgress}`}
              />
            </span>
            <span
              className={styles.videoBtn}
              style={
                darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
              }
            >
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
            style={
              darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}
            }
          >
            <IoMdInformation />
          </span>
          <AnimatePresence mode='popLayout'>
            {progress > 0 && (
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
                      downStop = true
                      console.log('test')
                    }}
                  >
                    <IoClose />
                  </span>
                </div>
              </motion.span>
            )}
          </AnimatePresence>
          <span className={`${styles.controllersGroup} ${styles.videoContent}`}>
            <span
              className={styles.videoContentItem}
              onClick={() => {
                likeVideoTest(options.video?.id)
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
              <p className={styles.count}>{options.video?.like_count}</p>
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
            <span
              className={styles.videoContentItem}
              onClick={() => {
                if (!downStop) {
                  downStop = false
                  handleDownload(Number(options.video?.id))
                }
              }}
            >
              <LuDownload
                className={styles.videoBtn}
                style={{
                  backgroundColor: 'transparent',
                  border: '3px solid blue',
                  color: 'blue',
                  padding: '3px',
                }}
              />
              <p className={styles.count}>{options.video?.download_count}</p>
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
              <MdScreenRotation />
            </span>
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
                dispatch(setFullScreen(!options.fullScreen))
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
      {options.fullScreen && (
        <motion.span
          initial={{
            width: '100%',
          }}
          animate={{
            x: 1,
          }}
          exit={{
            x: 0,
          }}
          transition={{
            delay: 1,
          }}
          className={styles.infoSpace}
          style={darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}}
        ></motion.span>
      )}
    </div>
  )
}

export default Player
