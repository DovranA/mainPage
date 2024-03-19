import { useSelector } from 'react-redux'
import Cards from '../Cards/cards'
import styles from './chosens.module.css'
import { Link } from 'react-router-dom'
import { SaylananlarDetail, SelectSaylananlar } from '../../features/mainSlice'
const Chosens = () => {
  const saylananlar = useSelector(SelectSaylananlar)
  return (
    <div className={styles.chosens}>
      <span className={styles.barHeader}>
        <p className={styles.title}>Saylananlar</p>
        <Link to={'/categories'} className={styles.btn}>
          Hemmesi {'>>'}
        </Link>
      </span>
      <Cards />
    </div>
  )
}

export default Chosens
