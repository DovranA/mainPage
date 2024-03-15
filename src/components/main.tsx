import Carousel from './Carousel/carousel'
import Chosens from './chosens'
import TopAccounts from './topAccounts'
import { slices } from '../carouselData.json'

export const Main = () => {
  return (
    <>
      <Carousel slides={slices} />
      <TopAccounts />
      <Chosens />
    </>
  )
}
export default Main
