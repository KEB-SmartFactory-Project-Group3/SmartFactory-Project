import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
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
import FormDialog from './FormDialog';
import {StyledDiv} from '../stylescomp/AppStyle';

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
          <Routes>
            <Route path='/' element={<SignIncomponent />}/>
            <Route path='/Landing/:id' element={
                  <AuthenticatedRoute>
                    <StyledDiv>
                      <Header />
                      <LandingPage />
                      </StyledDiv>
                  </AuthenticatedRoute>}/>

            <Route path='/MachinePage' element={
                  <AuthenticatedRoute>
                     <StyledDiv>
                      <Header />
                      <MachinePage />
                      </StyledDiv>
                  </AuthenticatedRoute>}/>

            <Route path='/TemperaturePage' element={
                  <AuthenticatedRoute>
                     <StyledDiv>
                      <Header />
                      <TemperaturePage />
                     </StyledDiv>
                  </AuthenticatedRoute>}/>

            <Route path='/Computervision' element={
                  <AuthenticatedRoute>
                     <StyledDiv>
                      <Header />
                      <Computervison />
                      </StyledDiv>
                  </AuthenticatedRoute>}/>

            <Route path='/Administrator' element={
                  <AuthenticatedRoute>
                     <StyledDiv>
                      <Header />
                      <Administrator />
                      </StyledDiv>
                  </AuthenticatedRoute>}/>

            <Route path='/FormDialog' element={
            <AuthenticatedRoute>
                <Header />
                <FormDialog />
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
