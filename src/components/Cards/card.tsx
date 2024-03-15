import { RiVideoLine } from 'react-icons/ri'
import { IoPlay } from 'react-icons/io5'

type Props = {
  img: string
  count: number
  title: string
  date: string
}
const Card = ({ img, count, title, date }: Props) => {
  // console.log(img)
  return (
    <div className='card'>
      <img src={img} alt={String(img)} className='bg-image' />
      <span className='card-icon'>
        <RiVideoLine />
        {count}
      </span>
      <div className='playBtn'>
        <IoPlay className='playBtn-icon' />
      </div>
      <div className='info'>
        <div className='info-data'>
          <h3 className='info-title'>{title}</h3>
          <p className='info-date'>{date}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
