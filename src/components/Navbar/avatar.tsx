import { useMain } from '../../MainContext'
import image from '../../assets/logo.png'
const Avatar = () => {
  const { state, dispatch } = useMain()
  return (
    <div
      onClick={() => dispatch({ type: 'setOption', payload: !state.option })}
      className='avatar'
    >
      <img src={image} alt='avatar' />
    </div>
  )
}

export default Avatar
