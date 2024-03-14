import Cards from './cards'

const Chosens = () => {
  return (
    <div className='chosens'>
      <span className='barHeader'>
        <p>Saylananlar</p>
        <span>Hemmesi {'>>'}</span>
      </span>
      <Cards />
    </div>
  )
}

export default Chosens
