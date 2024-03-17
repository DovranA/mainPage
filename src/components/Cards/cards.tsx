type Props = {
  data: Item[]
}
type Item = {
  img: string
  count: number
  title: string
  date: string
}
import Card from './card'
import styles from './cards.module.css'
const Cards = ({ data }: Props) => {
  return (
    <div className={styles.cards}>
      {data.map((item: Item, idx: number) => {
        return (
          <Card
            img={item.img}
            count={item.count}
            title={item.title}
            date={item.date}
            key={idx}
          />
        )
      })}
    </div>
  )
}

export default Cards
