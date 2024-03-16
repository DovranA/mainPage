import Avatar from './avatar'
import NotificationBtn from './notificationBtn'
import './navbar.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
const Navbar = () => {
  const [options, setOptions] = useState(false)
  console.log(options)
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
          <div
            onClick={() => {
              setOptions(!options)
            }}
          ></div>
          <Avatar func={setOptions} option={options} />
          {options ? (
            <ul className='options'>
              <li>Profile</li>
              <li>Ulgamdan chykmak</li>
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
