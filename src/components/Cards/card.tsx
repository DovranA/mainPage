import { RiVideoLine } from 'react-icons/ri'
import { IoPlay } from 'react-icons/io5'
type Props = {
  detail: SaylananlarDetail
}
import styles from './card.module.css'
import { SaylananlarDetail } from '../../features/mainSlice'
import moment from 'moment'
const Card = ({ detail }: Props) => {
  return (
    <div className={styles.card}>
      <img
        src={'http://' + detail?.videos[0]?.image_path}
        alt={String(detail.videos[0]?.image_path)}
        className={styles.bgImage}
      />
      <span className={styles.cardIcon}>
        <RiVideoLine />
        {detail.total_videos}
      </span>
      <div className={styles.playBtn}>
        <IoPlay className={styles.playBtnIcon} />
        <span className={styles.playBtnBg}></span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoData}>
          <h3 className={styles.infoTitle}>{detail.username}</h3>
          <p className={styles.infoDate}>
            {moment(detail.videos[0]?.created_at).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
