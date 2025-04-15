import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  Navbar, Home, About, Contact, Featured, Service, SignUp, Login,
  OtpVerification, ForgotPassword, PageNotFound, Footer, UserProfile, Setting
} from './AllComponets';

function App() {
  const [isAuthentication, isUserAuthentication] = useState(false);

  const HideFooterRoutes = ['/login', '/signup', '/otpverification', '/userprofile', '/setting'];

  const Wrapper = () => {
    const location = useLocation();
    const shouldHideFooter = HideFooterRoutes.some(route =>
      location.pathname.toLowerCase().startsWith(route)
    );

    return (
      <>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/featured' element={<Featured />} />
          <Route path='/service' element={<Service />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/setting' element={<Setting />} />

          {/* Private Route */}
          <Route path='/OtpVerification/:type/:userId' element={<OtpVerification />} />
        </Routes>
        {!shouldHideFooter && <Footer />}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  );
}

export default App;
