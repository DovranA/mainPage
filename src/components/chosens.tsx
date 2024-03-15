import Cards from './Cards/cards'
import image1 from '../assets/deniz.jpg'
import image2 from '../assets/nature.jpg'
import image3 from '../assets/surat1.jpg'
import image4 from '../assets/ydag.jpg'
import image5 from '../assets/pexels-ken-cheung-5574638.jpg'
const data = [
  { img: image1, count: 29, title: 'multik', date: '19.02.2024' },
  { img: image2, count: 99, title: 'oyun', date: '19.02.2024' },
  { img: image3, count: 19, title: 'kino', date: '19.02.2024' },
  { img: image4, count: 49, title: 'multik', date: '19.02.2024' },
  { img: image5, count: 90, title: 'video', date: '19.02.2024' },
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
