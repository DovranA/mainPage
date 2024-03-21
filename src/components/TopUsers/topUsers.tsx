import { useSelector } from 'react-redux'
import './topUsers.css'
import { SelectTopUser } from '../../features/mainSlice'

const TopUsers = () => {
  const topUsers = useSelector(SelectTopUser)
  return (
    <div className='banners'>
      <div className='banner'>
        <span className='title'>
          Top Hasaplar
          {topUsers?.total ? '(' + topUsers.total + ')' : ''}
        </span>
        <img
          src={String(topUsers?.image)}
          alt={String(topUsers?.total)}
          className='image-fit'
        />
      </div>
    </div>
  )
}

export default TopUsers
