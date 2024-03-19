import Carousel from '../../components/Carousel/carousel'
import Chosens from '../../components/Chosens/chosens'
import Attached from '../../components/Attached/attached'
import TopUsers from '../../components/TopUsers/topUsers'
import TopVideos from '../../components/TopVideos/topVideos'
import styles from './main.module.css'
import Brands from '../../components/Brands/brands'
import TotalVideos from '../../components/TotalVideos/totalVideos'
import Trends from '../../components/Trends/trends'
export const Main = () => {
  return (
    <div className='base'>
      <Carousel />
      <TopUsers />
      <Chosens />
      <TopVideos />
      <span className={styles.twoBanners}>
        <Trends />
        <Brands />
      </span>
      <TotalVideos />
      <Attached />
    </div>
  )
}
export default Main
