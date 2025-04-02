import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar, Home, About, Contact, Featured, Service, SignUp, Login, 
  OtpVerification, ForgotPassword, PageNotFound } from './AllComponets'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/featured' element={<Featured />} />
        <Route path='/service' element={<Service />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/OtpVerification/:type/:userId' element={<OtpVerification />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


