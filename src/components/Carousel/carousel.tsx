import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import styles from './carousel.module.css'
import { SelectBanner } from '../../features/mainSlice'
import { useSelector } from 'react-redux'
const Carousel = () => {
  const carousel = useSelector(SelectBanner)
  const [slide, setSlide] = useState<number>(0)
  const nextSlide = () => {
    setSlide(slide === carousel?.images.length - 1 ? 0 : slide + 1)
  }
  const prevSlide = () => {
    setSlide(slide === 0 ? carousel?.images.length - 1 : slide - 1)
  }
  return (
    <div className={styles.carousel}>
      <BsArrowLeftCircleFill
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prevSlide}
      />
      <div className={styles.carouselTrack}>
        {carousel?.images.map((item: any, idx: number) => {
          return (
            <img
              src={'http://' + item.img}
              alt={String(idx)}
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
        {carousel?.images.map((_: any, idx: number) => {
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
