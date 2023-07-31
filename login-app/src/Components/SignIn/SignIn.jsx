import React from 'react';
import './SignIn.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutPage from './LogoutPage';
import Header from './Header'
import LandingPage from './LandingPage';
import ErrorPage from './ErrorPage';
import SignIncomponent from './SignIncomponent';
import MachinePage from './MachinePage';
import TemperaturePage from './TemperaturePage';
import Computervison from './Computervision';
import Administrator from './Administrator';
import AuthProvider, { useAuth } from './security/AuthContext';

function AuthenticatedRoute( {children} ) {
  const authContext = useAuth()

  //사용자가 인증되었으면 children 반환
  if (authContext.isAuthenticated)
       return children

  return <Navigate to="/" />
}
function Monitoring() {

  return (
    <div className="SignInApp">
      <AuthProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<SignIncomponent />}/>
            {/* <Route path='/Signin' element={<SignIncomponent />} /> */}
        
            <Route path='/Landing/:username' element={
                  <AuthenticatedRoute>
                      <LandingPage />
                  </AuthenticatedRoute>}/>

            <Route path='/MachinePage' element={
                  <AuthenticatedRoute>
                      <MachinePage />
                  </AuthenticatedRoute>}/>

            <Route path='/TemperaturePage' element={
                  <AuthenticatedRoute>
                      <TemperaturePage />
                  </AuthenticatedRoute>}/>

            <Route path='/Computervision' element={
                  <AuthenticatedRoute>
                      <Computervison />
                  </AuthenticatedRoute>}/>

            <Route path='/Administrator' element={
                  <AuthenticatedRoute>
                      <Administrator />
                  </AuthenticatedRoute>}/>

            <Route path='/Logout' element={<LogoutPage />}/>

            <Route path='*' element={<ErrorPage />}/>
          </Routes>
      
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}



export default Monitoring;
