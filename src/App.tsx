import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './page/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Categories from './page/Categories/categories'
import Categorie from './components/Categorie/categorie'
import Main from './page/Main/main'
import { useEffect } from 'react'
import { handleFetch } from './features/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerVisable } from './features/videoSlice'
import Player from './components/Player/player'

const App = () => {
  const dispach = useDispatch()
  useEffect(() => {
    dispach(handleFetch())
  }, [])
  const playerVisable = useSelector(PlayerVisable)
  const PlayerVisable2 = () => {
    if (playerVisable) {
      return <Player />
    }
  }
  return (
    <BrowserRouter>
      {PlayerVisable2()}
      <Navbar />
      <Routes>
        <Route path='/' index element={<Main />} />
        <Route path='/categories/' element={<Categories />}>
          <Route path='/categories/:categorie' element={<Categorie />} />
        </Route>
      </Routes>
      <Footer />
      <Login />
    </BrowserRouter>
  )
}

export default App
