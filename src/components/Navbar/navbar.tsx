import Avatar from './avatar'
import NotificationBtn from './notificationBtn'
import './navbar.css'
const Navbar = () => {
  return (
    <div>
      <nav className='navBar'>
        <span className='icon'>
          <span className='icon-left'>TM</span>
          <span className='icon-right'>BIZ</span>
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
        </span>
      </nav>
    </div>
  )
}

export default Navbar
