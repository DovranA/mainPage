import { useSelector } from 'react-redux'
import Videos from '../Videos/videos'
import styles from './attached.module.css'
import { SelectPinnedVideos } from '../../features/mainSlice'
import {
  PlayerOptions,
  SelectFromVideos,
  addVideos,
} from '../../features/videoSlice'
import { useAppDispatch } from '../../app/hooks'
const Attached = () => {
  const pinnedVideos = useSelector(SelectPinnedVideos)
  const fromVideos = useSelector(SelectFromVideos)
  const dispach = useAppDispatch()
  const option = useSelector(PlayerOptions)
  if (fromVideos === 'berkidilenler') {
    dispach(
      addVideos({ videos: pinnedVideos?.detail, id: option.firstVideo?.id })
    )
  }
  return (
    <div className={styles.attached}>
      <span className={styles.title}>Berkidilenler</span>
      <Videos videos={pinnedVideos} />
      <div className={styles.more}>
        <button className={styles.btn}>More</button>
      </div>
    </div>
  )
}

export default Attached
