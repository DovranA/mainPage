import styles from './footer.module.css'
import appStore from '../../assets/appStore.png'
import playStore from '../../assets/playStore.png'
import bigLogo from '../../assets/tmBiz.png'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.menu}>
        <li>Ulanysh duzgunleri</li>
        <li>Hawarlashmak</li>
        <li>Biz barada</li>
      </ul>
      <span className={styles.social}>
        <div className={styles.stores}>
          <img src={appStore} alt='appStore' />
          <img src={playStore} alt='playStore' />
        </div>
        <div className={styles.apps}>
          <FaYoutube className={styles.icon} />
          <FaTiktok className={styles.icon} />
          <FaInstagram className={styles.icon} />
        </div>
      </span>
      <span className={styles.logo}>
        <img src={bigLogo} alt='tmBiz' />
        <p>@2022 TMBIZ , Turkmenistan. All rights reserved</p>
      </span>
    </div>
  )
}

export default Footer
