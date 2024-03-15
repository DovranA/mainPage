import React from 'react'
import './cards.css'
import Card from './card'
type Props = {
  data: Item[]
}
type Item = {
  img: string
  count: number
  title: string
  date: string
}

const Cards = ({ data }: Props) => {
  return (
    <div className='cards'>
      {data.map((item: Item) => {
        return (
          <Card
            img={item.img}
            count={item.count}
            title={item.title}
            date={item.date}
          />
        )
      })}
    </div>
  )
}

export default Cards
