type Props = {
  func: () => void
  option: boolean
}

import image from '../../assets/logo.png'
const Avatar = ({ func, option }: Props) => {
  console.log(option)
  return (
    <div onClick={() => func(!option)} className='avatar'>
      <img src={image} alt='avatar' />
    </div>
  )
}

export default Avatar
