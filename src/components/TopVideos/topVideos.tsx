import { useSelector } from 'react-redux'
import './topVideos.css'
import { SelectTopUser, SelectTopVideos } from '../../features/mainSlice'

const TopVideos = () => {
  const topVideos = useSelector(SelectTopVideos)
  return (
    <div className='banners'>
      <div className='banner'>
        <span className='title'>
          Top Widolar
          {topVideos?.total ? '(' + topVideos.total + ')' : ''}
        </span>
        <img
          src={String(topVideos?.image)}
          alt={String(topVideos?.total)}
          className='image-fit'
        />
      </div>
    </div>
  )
}

export default TopVideos
