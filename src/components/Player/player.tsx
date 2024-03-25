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
  setPause,
  setVideo,
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
import { CiSearch } from 'react-icons/ci'
import { useParams } from 'react-router-dom'

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
                onClick={() => {
                  dispatch(likeVideo(options?.video?.id))
                  console.log('liked')
                  console.log(options?.video?.id)
                }}
              />
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
                // downloadClick(
                //   String(options.video?.videofile),
                //   Number(options.video?.id)
                // )
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
      {options.fullScreen ? (
        <span
          className={styles.infoSpace}
          style={darkMode ? { backgroundColor: '#212121', color: '#fff' } : {}}
        ></span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Player
