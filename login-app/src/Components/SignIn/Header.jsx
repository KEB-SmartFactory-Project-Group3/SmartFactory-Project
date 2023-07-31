import React from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useAuth } from './security/AuthContext';
import { useState } from 'react';

function Header() {
   
  const authContext = useAuth()
  //authContext에서 인증 정보를 가져와서 지역 변수에 넣음
  const isAuthenticated = authContext.isAuthenticated 

  const navigate = useNavigate()

 
  if (window.location.pathname === '/')
    return null
 
   // 로그아웃 하드 코딩
   function handleSubmitLogout(e) {
    e.preventDefault();
    // 로그아웃 성공하면 로그아웃 페이지로 이동
    navigate(`/`)
    authContext.logout()
   }

  //  function handleLoginClick() {
  //   navigate(`/`)
  //  }
   return (
     <header className="header">
        <AppBar position="static" sx={{ backgroundColor: 'transparent'}} className="headerapp">
       <div className="container">
         <Toolbar>
           <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center' ,listStyle: 'none'}}>
           
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to="/Landing/:username" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>}</li>
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to="/MachinePage" style={{ textDecoration: 'none', color: 'black' }}>기계</Link>}</li>
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to="/TemperaturePage" style={{ textDecoration: 'none', color: 'black' }}>온도</Link>}</li>
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to="/Computervision" style={{ textDecoration: 'none', color: 'black' }}>불량품</Link>}</li>
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to="/Administrator" style={{ textDecoration: 'none', color: 'black' }}>관리자DB</Link>}</li>
            
           </ul>
           <ul className="navbar-nav" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
             {/* <li style={{marginRight: '1rem'}} className="nav-item">
              {!isAuthenticated && <Button onClick={handleLoginClick}>Login</Button>}</li> */}
             <li className="nav-item">
              {isAuthenticated && <Button onClick={handleSubmitLogout}>Logout</Button>}</li>
           </ul>
         </Toolbar>
       </div>

     </AppBar>
    </header>
 
 
 
   )
 }
 
 export default Header;