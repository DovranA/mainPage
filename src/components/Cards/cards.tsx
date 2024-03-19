import { useSelector } from 'react-redux'
import { SaylananlarDetail, SelectSaylananlar } from '../../features/mainSlice'
import Card from './card'
import styles from './cards.module.css'
const Cards = () => {
  const saylananlar = useSelector(SelectSaylananlar)
  return (
    <div className={styles.cards}>
      {saylananlar?.details.map(
        (saylananlarDetail: SaylananlarDetail, idx: number) => {
          return <Card detail={saylananlarDetail} key={idx} />
        }
      )}
    </div>
  )
}

export default Cards
