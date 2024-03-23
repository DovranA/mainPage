import styles from './video.module.css'
import { IoPlay } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { PinnedVideoDetail } from '../../../features/mainSlice'
import moment from 'moment'
import { useAppDispatch } from '../../../app/hooks'
import {
  addFromVideos,
  setFirstVideo,
  videoPlayerVisable,
} from '../../../features/videoSlice'

type Param = {
  video: PinnedVideoDetail
}
const Video = ({ video }: Param) => {
  const dispatch = useAppDispatch()
  return (
    <div className={styles.video}>
      <div
        className={styles.preview}
        onClick={() => {
          dispatch(addFromVideos('berkidilenler'))
          dispatch(setFirstVideo(video))
          dispatch(videoPlayerVisable(true))
        }}
      >
        <img
          src={String(video.image_path)}
          alt='video'
          className={styles.thumbnail}
        />
        <div className={styles.playBtn}>
          <IoPlay className={styles.playBtnIcon} />
          <span className={styles.playBtnBg}></span>
        </div>
      </div>
      <div className={styles.about}>
        <h2 className={styles.title}>{video.description}</h2>
        <div className={styles.infos}>
          <span className={styles.info}>
            <span className={styles.text}>
              {moment(video.created_at).format('DD.MM.YYYY')}
            </span>
            <span className={styles.text}>
              <FiDownload className={styles.icon} /> {video.download_count}
            </span>
            <span className={styles.text}>
              <FiEye className={styles.icon} /> {video.view_count}
            </span>
          </span>
          <span className={styles.text}>
            {video.like_count}{' '}
            <FaHeart className={`${styles.icon} ${styles.iconHeart}`} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Video
