import { useState } from 'react'
import './carousel.css'
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
import image3 from './img/surat1.jpg'
import image4 from './img/ydag.jpg'
const slides = [
  { src: image1, altr: 'f slice' },
  { src: image2, altr: 'Second slice' },
  { src: image3, altr: 'Third slice' },
  { src: image4, altr: 'Fourth slice' },
]
const Carousel = () => {
  const [slide, setSlide] = useState<number>(0)
  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1)
  }
  const prevSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1)
  }

  return (
    <div className='carousel'>
      <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide} />
      {slides.map((item: item, idx: number) => {
        return (
          <img
            src={item.src}
            alt={item.altr}
            key={idx}
            className={slide === idx ? 'slide' : 'slide slide-hiden'}
          />
        )
      })}
      <BsArrowRightCircleFill
        className='arrow arrow-right'
        onClick={nextSlide}
      />

      <span className='indicators'>
        {slides.map((_: any, idx: number) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx ? 'indicator' : 'indicator indicator-inactive'
              }
            ></button>
          )
        })}
      </span>
    </div>
  )
}
export default Carousel
