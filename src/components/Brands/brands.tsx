import { useSelector } from 'react-redux'
import './brands.css'
import { SelectBrands } from '../../features/mainSlice'

const Brands = () => {
  const brands = useSelector(SelectBrands)
  return (
    <div className='banners'>
      <div className='banner'>
        <span className='title'>
          Brendlar
          {brands?.total ? '(' + brands.total + ')' : ''}
        </span>
        <img
          src={'http://' + brands?.image}
          alt={String(brands?.total)}
          className='image-fit'
        />
      </div>
    </div>
  )
}

export default Brands
