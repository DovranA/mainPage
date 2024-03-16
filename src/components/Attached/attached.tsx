import Videos from '../Videos/videos'
import styles from './attached.module.css'
const Attached = () => {
  return (
    <div className={styles.attached}>
      <span className={styles.title}>Berkidilenler</span>
      <Videos />
      <div className={styles.more}>
        <button className={styles.btn}>More</button>
      </div>
    </div>
  )
}

export default Attached
