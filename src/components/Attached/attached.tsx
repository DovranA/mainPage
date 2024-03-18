import { useSelector } from 'react-redux'
import Videos from '../Videos/videos'
import styles from './attached.module.css'
import { SelectVideo } from '../../features/videoSlice'
const Attached = () => {
  const videos = useSelector(SelectVideo)
  // console.log(videos)
  return (
    <div className={styles.attached}>
      <span className={styles.title}>Berkidilenler</span>
      <Videos videos={videos} />
      <div className={styles.more}>
        <button className={styles.btn}>More</button>
      </div>
    </div>
  )
}

export default Attached
