import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { SelectVideos, videoPlayerVisable } from '../../features/videoSlice'
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
import { useState } from 'react'
import VideoContent from './video'
const body = document.body
const Player = () => {
  body.style.overflow = 'hidden'
  const dispatch = useAppDispatch()
  const videos = useSelector(SelectVideos)
  const [info, setInfo] = useState(false)
  // console.log(videos)
  return (
    <div className={styles.playerMain}>
      <span className={styles.videoSpace}>
        <div className={styles.app__videos}>
          {videos.map((video: video, idx: number) => {
            return <VideoContent videofile={video.videofile} key={idx} />
          })}
        </div>
        <div className={`${styles.controllers} ${styles.controllersLeft}`}>
          <span
            className={styles.videoBtn}
            onClick={() => {
              dispatch(videoPlayerVisable(false))
            }}
          >
            <IoClose />
          </span>
          <span
            className={`${styles.controllersGroup} ${styles.controllersCenter}`}
          >
            <span className={styles.videoBtn}>
              <IoIosArrowUp />
            </span>
            <span className={styles.videoBtn}>
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
            onClick={() => {
              setInfo(!info)
            }}
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
            <span className={styles.videoBtn}>
              <GoScreenFull />
            </span>
          </span>
        </div>
      </span>
      {info ? <span className={styles.infoSpace}></span> : <></>}
    </div>
  )
}

export default Player
