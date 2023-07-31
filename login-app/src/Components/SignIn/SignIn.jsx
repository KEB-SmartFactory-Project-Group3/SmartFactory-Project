import React from 'react';
import './SignIn.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoutPage from './LogoutPage';
import Header from './Header'
import LandingPage from './LandingPage';
import ErrorPage from './ErrorPage';
import SignIncomponent from './SignIncomponent';

function Monitoring() {
  return (
    <div className="SignInApp">
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
    </div>
  )
}

function MachinePage() {
  return (
    <div className="MachinePage">
      <h1>기계 장치</h1>
    </div>
  )
}

function TemperaturePage() {
  return (
    <div className="TemperaturePage">
      <h1>온도</h1>
    </div>
  )
}

function Computervison() {
  return (
    <div className="Computervision">
      <h1>컴퓨터 비전</h1>
    </div>
  )
}

function Administrator() {
  return (
    <div className="Administrator">
      <h1>관리자DB</h1>
    </div>
  )
}


export default Monitoring;
