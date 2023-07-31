import React from 'react';
import './SignIn.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoutPage from './LogoutPage';
import Header from './Header'
import LandingPage from './LandingPage';
import ErrorPage from './ErrorPage';
import SignIncomponent from './SignIncomponent';
import MachinePage from './MachinePage';
import TemperaturePage from './TemperaturePage';
import Computervison from './Computervision';
import Administrator from './Administrator';
import AuthProvider from './security/AuthContext';
import { AuthContext } from './security/AuthContext';

function Monitoring() {
  return (
    <div className="SignInApp">
      <AuthProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<SignIncomponent />}/>
            <Route path='/Signin' element={<SignIncomponent />} />
            <Route path='/Landing/:username' element={<LandingPage />}/>
            <Route path='/MachinePage' element={<MachinePage />}/>
            <Route path='/TemperaturePage' element={<TemperaturePage />}/>
            <Route path='/Computervision' element={<Computervison />}/>
            <Route path='/Administrator' element={<Administrator />}/>
            <Route path='/Logout' element={<LogoutPage />}/>

            <Route path='*' element={<ErrorPage />}/>
          </Routes>
      
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}



export default Monitoring;
