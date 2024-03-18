import Banner from '../Banner/banner'
import Carousel from '../Carousel/carousel'
import Chosens from '../Chosens/chosens'
import image1 from '../../assets/deniz.jpg'
import image2 from '../../assets/test.png'
import image3 from '../../assets/pexels-pixabay-326212.jpg'
import image4 from '../../assets/pexels-ian-beckley-2440078.jpg'
import Attached from '../Attached/attached'
import { useMain } from '../../MainContext'
import { useSelector } from 'react-redux'
import { SelectCount } from '../../features/testSlice'
const banner1 = [{ title: 'Top hasaplar', image: image1 }]
const banner2 = [{ title: 'Top Wideolar', image: image2 }]
const banner3 = [
  { title: 'Trendler', image: image3, count: 31 },
  { title: 'Brendler', image: image4, count: 15 },
]
const banner4 = [{ title: 'Wideolar', image: image1, count: 45 }]
export const Main = () => {
  const data = useSelector(SelectCount)
  console.log(data)

  const { state, dispatch } = useMain()
  return (
    <div
      className='base'
      onClick={() => dispatch({ type: 'setOption', payload: false })}
    >
      <Carousel />
      <Banner data={banner1} />
      <Chosens />
      <Banner data={banner2} />
      <Banner data={banner3} />
      <Banner data={banner4} />
      <Attached />
    </div>
  )
}
export default Main
