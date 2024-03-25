import { RiVideoLine } from 'react-icons/ri'
import { IoPlay } from 'react-icons/io5'
type Props = {
  detail: SaylananlarDetail
}
import styles from './card.module.css'
import { SaylananlarDetail } from '../../features/mainSlice'
import moment from 'moment'
import { useAppDispatch } from '../../app/hooks'
import {
  addVideos,
  setFirstVideo,
  videoPlayerVisable,
} from '../../features/videoSlice'
const Card = ({ detail }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className={styles.card}
      onClick={() => {
        // dispatch(addVideos({ videos: detail?.videos }))
        dispatch(videoPlayerVisable(true))
      }}
    >
      <img
        src={String(detail?.image)}
        alt={String(detail?.name)}
        className={styles.bgImage}
      />
      <span className={styles.cardIcon}>
        <RiVideoLine />
        {detail?.total_views}
      </span>
      <div className={styles.playBtn}>
        <IoPlay
          className={styles.playBtnIcon}
          onClick={() => {
            // dispatch(addVideos(detail.videos))
            dispatch(videoPlayerVisable(true))
          }}
        />
        <span className={styles.playBtnBg}></span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoData}>
          <h3 className={styles.infoTitle}>{detail.name}</h3>
          <p className={styles.infoDate}>
            {moment(detail?.created_at).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card
