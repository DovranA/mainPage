import Cards from './Cards/cards'

const data = [
  { count: 9, title: 'multik', date: '19.02.2024' },
  { count: 9, title: 'oyun', date: '19.02.2024' },
  { count: 9, title: 'kino', date: '19.02.2024' },
  { count: 9, title: 'multik', date: '19.02.2024' },
  { count: 9, title: 'multik', date: '19.02.2024' },
]
const Chosens = () => {
  return (
    <div className='chosens'>
      <span className='barHeader'>
        <p>Saylananlar</p>
        <span>Hemmesi {'>>'}</span>
      </span>
      <Cards data={data} />
    </div>
  )
}

export default Chosens
