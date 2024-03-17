import Avatar from './avatar'
import NotificationBtn from './notificationBtn'
import './navbar.css'
import logo from '../../assets/logo.png'
import { useMain } from '../../MainContext'
import { FiUser } from 'react-icons/fi'
import { RxExit } from 'react-icons/rx'
const Navbar = () => {
  const { state, dispatch } = useMain()
  return (
    <div className='base'>
      <nav className='navBar'>
        <span className='icon'>
          <img src={logo} alt='logo' />
        </span>
        <span className='search'>
          <input type='text' placeholder='Gozleg....' />
          <span className='icon-lens'>
            <i className='bi bi-search'></i>
          </span>
        </span>
        <span className='user'>
          <NotificationBtn count={3} />
          <Avatar />
          {state.option ? (
            <ul className='options'>
              <li
                onClick={() => {
                  dispatch({ type: 'setProfile', payload: true })
                  dispatch({ type: 'setOption', payload: false })
                }}
              >
                <FiUser className='optionIcon' />
                Profile
              </li>
              <li>
                <RxExit className='optionIcon' />
                Ulgamdan chykmak
              </li>
            </ul>
          ) : (
            <></>
          )}
        </span>
      </nav>
    </div>
  )
}

export default Navbar
