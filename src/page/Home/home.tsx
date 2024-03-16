import Footer from '../../components/Footer/footer'
import Main from '../../components/Main/main'
import Navbar from '../../components/Navbar/navbar'
import styles from './home.module.css'
const Home = () => {
  return (
    <div className={styles.base}>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}

export default Home
