import React from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useAuth } from './security/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function Header() {
   
  const authContext = useAuth()
  //authContext에서 인증 정보를 가져와서 지역 변수에 넣음
  const isAuthenticated = authContext.isAuthenticated
  
  // 현재 관리자 가져오기
  const currentUser = authContext.currentUser 

  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
 
   // 로그아웃 하드 코딩
   function handleSubmitLogout(e) {
    e.preventDefault();
    setOpen(true)
   }

   function handleLogoutConfirm() {
    navigate(`/`)
    authContext.logout()
    setOpen(false) 
   }

   function handleLogoutCancel() {
    setOpen(false)
   }
   

  if (window.location.pathname === '/' || window.location.pathname === '*')
  return null

   return (
     <header className="header">
        <AppBar position="static" sx={{ backgroundColor: 'transparent'}} className="headerapp">
       <div className="container">
         <Toolbar>
           <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center' ,listStyle: 'none'}}>
           
             <li style={{marginRight: '4rem'}} className="nav-item">
              {isAuthenticated && <Link className="nav-link" to={`/Landing/${currentUser.name}`}  style={{ textDecoration: 'none', color: 'black' }}>Home</Link>}</li>
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

              <div
              className="nav-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0.5rem',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                borderRadius: '10px'
              }}
              >
                {isAuthenticated && currentUser && (
                  <>
                    <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
                    <span style={{ color: 'black' }} >현재 관리자 : {currentUser.name}</span>
                  </>
                )}
              </div>
             <li className="nav-item">
              {isAuthenticated && <Button onClick={handleSubmitLogout}>Logout</Button>}</li>
           </ul>
         </Toolbar>
       </div>

     </AppBar>

     <Dialog open={open}>
      <DialogTitle>로그아웃</DialogTitle>
      <DialogContent>
        정말 로그아웃 하시겠습니까?
      </DialogContent>
      <DialogActions>
           <button variant="text" onClick={handleLogoutConfirm}>yes</button>
           <button variant="text" onClick={handleLogoutCancel}>cancel</button>
      </DialogActions>
     </Dialog>
    </header>

 
 
   )
 }
 
 export default Header;