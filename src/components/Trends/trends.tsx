import { useSelector } from 'react-redux'
import './trends.css'
import { SelectTrends } from '../../features/mainSlice'

const Trends = () => {
  const trends = useSelector(SelectTrends)
  return (
    <div className='banners'>
      <div className='banner'>
        <span className='title'>
          Trendlar
          {trends?.total ? '(' + trends.total + ')' : ''}
        </span>
        <img
          src={String(trends?.image)}
          alt={String(trends?.total)}
          className='image-fit'
        />
      </div>
    </div>
  )
}

export default Trends
