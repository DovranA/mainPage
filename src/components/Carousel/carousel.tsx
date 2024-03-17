import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

// type Params = {
//   slides: item[]
// }
type item = {
  img: string
  altr: string
}
// import image1 from './img/deniz.jpg'
// import image2 from './img/nature.jpg'
// import image3 from './img/pexels-ken-cheung-5574638.jpg'
// import image4 from './img/ydag.jpg'
// const slides = [
//   { img: image1, altr: 'f slice' },
//   { img: image2, altr: 'Second slice' },
//   { img: image3, altr: 'Third slice' },
//   { img: image4, altr: 'Fourth slice' },
// ]

import styles from './carousel.module.css'
import { useMain } from '../../MainContext'
// import { useMain } from '../../MainContext'
const Carousel = () => {
  const { state } = useMain()
  const slides = state.slides
  const [slide, setSlide] = useState<number>(0)
  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1)
  }
  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1)
  }
  return (
    <div className={styles.carousel}>
      <BsArrowLeftCircleFill
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prevSlide}
      />
      <div className={styles.carouselTrack}>
        {slides.map((item: item, idx: number) => {
          return (
            <img
              src={item.img}
              alt={item.altr}
              key={idx}
              className={
                slide === idx
                  ? styles.slide
                  : `${styles.slide} ${styles.slideActive}`
              }
            />
          )
        })}
      </div>
      <BsArrowRightCircleFill
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={nextSlide}
      />

      <span className={styles.indicators}>
        {slides.map((_: any, idx: number) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx
                  ? styles.indicator
                  : `${styles.indicator} ${styles.indicatorInactive}`
              }
            ></button>
          )
        })}
      </span>
    </div>
  )
}
export default Carousel
