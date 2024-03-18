import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './page/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Main from './components/Main/main'
import Categories from './page/Categories/categories'
import Categorie from './components/Categorie/categorie'

const App = () => {
  return (
    <BrowserRouter>
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
