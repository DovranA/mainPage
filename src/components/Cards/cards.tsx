import React from 'react'
import './cards.css'
type Props = {
  data: Item[]
}
type Item = {
  count: number
  title: string
  date: string
}

const Cards = ({ data }: Props) => {
  return (
    <div className='cards'>
      {data.map((item: Item) => {
        return <div className='card'></div>
      })}
    </div>
  )
}

export default Cards
