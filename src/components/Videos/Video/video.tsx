import styles from './video.module.css'
import image1 from '../../../assets/surat1.jpg'
import { IoPlay } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'

type Video = {
  thumbnail: string
}
type Param = {
  video: Video
}
const Video = ({ video }: Param) => {
  return (
    <div className={styles.video}>
      <div className={styles.preview}>
        <img src={video.thumbnail} alt='video' className={styles.thumbnail} />
        <div className={styles.playBtn}>
          <IoPlay className={styles.playBtnIcon} />
          <span className={styles.playBtnBg}></span>
        </div>
      </div>
      <div className={styles.about}>
        <h2 className={styles.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          labore ...
        </h2>
        <div className={styles.infos}>
          <span className={styles.info}>
            <span className={styles.text}>19.02.2024</span>
            <span className={styles.text}>
              <FiDownload className={styles.icon} /> 100
            </span>
            <span className={styles.text}>
              <FiEye className={styles.icon} /> 2000
            </span>
          </span>
          <span className={styles.text}>
            8,200 <FaHeart className={`${styles.icon} ${styles.iconHeart}`} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Video
