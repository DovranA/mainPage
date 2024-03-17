import './banner.css'
import imageTop from '../../assets/pexels-ken-cheung-5574638.jpg'

import React from 'react'

type Item = {
  title: string
  image: string
  count?: number
}

const Banner: React.FC<{ data: Item[] }> = ({ data }) => {
  return (
    <div className='banners'>
      {data.map((item: Item, index: number) => (
        <div key={index} className='banner'>
          <span className='title'>
            {item.title} {item.count ? '(' + item.count + ')' : ''}
          </span>
          <img src={item.image} alt={item.title} className='image-fit' />
        </div>
      ))}
    </div>
  )
}

export default Banner
