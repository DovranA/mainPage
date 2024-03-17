import { RiVideoLine } from 'react-icons/ri'
import { IoPlay } from 'react-icons/io5'
type Props = {
  img: string
  count: number
  title: string
  date: string
}
import styles from './card.module.css'
const Card = ({ img, count, title, date }: Props) => {
  return (
    <div className={styles.card}>
      <img src={img} alt={String(img)} className={styles.bgImage} />
      <span className={styles.cardIcon}>
        <RiVideoLine />
        {count}
      </span>
      <div className={styles.playBtn}>
        <IoPlay className={styles.playBtnIcon} />
        <span className={styles.playBtnBg}></span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoData}>
          <h3 className={styles.infoTitle}>{title}</h3>
          <p className={styles.infoDate}>{date}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
