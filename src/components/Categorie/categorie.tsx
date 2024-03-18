import React from 'react'
import styles from './categorie.module.css'
import Banner from '../Banner/banner'
import { useParams } from 'react-router-dom'
import Videos from '../Videos/videos'
import { useMain } from '../../MainContext'
const Categorie = () => {
  const { categorie } = useParams()
  const { state } = useMain()
  const videos = [state.slides[0].img, state.slides[1].img, state.slides[2].img]
  return (
    <div className={styles.categorie}>
      <Banner data={[{ image: 'test' }]} />
      {/* <Videos videos={videos} /> */}
    </div>
  )
}

export default Categorie
