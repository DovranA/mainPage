import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

type Params = {
  slides: item[]
}
type item = {
  src: string
  altr: string
}
import image1 from './img/deniz.jpg'
import image2 from './img/nature.jpg'
import image3 from './img/pexels-ken-cheung-5574638.jpg'
import image4 from './img/ydag.jpg'
const slides = [
  { src: image1, altr: 'f slice' },
  { src: image2, altr: 'Second slice' },
  { src: image3, altr: 'Third slice' },
  { src: image4, altr: 'Fourth slice' },
]

import styles from './carousel.module.css'
const Carousel = () => {
  const [slide, setSlide] = useState<number>(0)
  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1)
  }
  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1)
  }
  console.log(slide)
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
              src={item.src}
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
