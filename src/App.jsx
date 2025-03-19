import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home'
import About from './Components/Abour'
import Contact from './Components/Contact'
import Featured from './Components/Featured'
import Service from './Components/Service'
import SignUp from './Components/SignUp/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/about'  element={<About/>}/>
        <Route path='/contact'  element={<Contact/>}/>
        <Route path='/featured'  element={<Featured/>}/>
        <Route path='/service'  element={<Service/>}/>
        <Route path='/signUp'  element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}


