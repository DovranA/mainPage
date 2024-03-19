import { useSelector } from 'react-redux'
import './totalVideos.css'
import { SelectTotalVideos } from '../../features/mainSlice'

const TotalVideos = () => {
  const totalVideos = useSelector(SelectTotalVideos)
  return (
    <div className='banners'>
      <div className='banner'>
        <span className='title'>
          Wideolar
          {totalVideos?.total ? '(' + totalVideos.total + ')' : ''}
        </span>
        <img
          src={'http://' + totalVideos?.image}
          alt={String(totalVideos?.total)}
          className='image-fit'
        />
      </div>
    </div>
  )
}

export default TotalVideos
