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
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { Tabs, Tab, useMediaQuery, useTheme, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import DrawerComp from './DrawerComp';
import AndroidIcon from '@mui/icons-material/Android';


function Header(props) {
   
  const authContext = useAuth()
  const isAuthenticated = authContext.isAuthenticated
  // 현재 관리자 가져오기
  const currentUser = authContext.currentUser
  //const name = authContext.currentUser?.name // 로그인 api로 가져온 name
  const name = authContext.currentUser && authContext.currentUser.name //javascript

  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [value, setValue] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const isMatch = useMediaQuery(useTheme().breakpoints.down("md"))

  useEffect(()=>{
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    }else {
      setIsMobile(false)
    }
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
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
   

  if (window.location.pathname === '/')
      return null
  

   return (
     <header className="header">
      <AppBar  sx={{ background:'transparent',boxShadow:0 ,position: 'sticky'}} className="headerapp">
        {isMatch ? (
          <Box display='flex'>
          <AndroidIcon sx={{color: 'white', padding: 1}}/>
          <Typography sx={{padding:0.5 ,color:'white'}} variant='h6' fontFamily='Tektur, cursive'>
            gugu
          </Typography>
            <DrawerComp />
          </Box>
        ): (  
          <Toolbar>
            <Box sx={{display: 'flex', width: '100%', justifyContent:'center', alignItems:'center'}} >
              <AndroidIcon sx={{color: 'white', marginRight: '5rem'}}/>
                <Box>
                  <Tabs value={value} 
                      onChange={handleChange} 
                      aria-label="nav tabs example"
                      textColor="inherit"
                      indicatorColor="transparent"
                  >
                    {isAuthenticated && (
                        <>
                          <Tab
                            label="Home"
                            value={`/Landing/${currentUser.name}`}
                            component={Link}
                            to={`/Landing/${currentUser.name}`}
                            style={{ textDecoration: 'none', ":hover":{textDecoration:"underline"},
                                    fontWeight:"bold", color: 'white', marginRight: '4rem' ,
                                    borderBottom: value === `/Landing/${currentUser.name}` ? '2px solid white' : 'none', 
                                    transition: 'border-bottom 0.3s ease',  
                                   }}
                                   onClick={(e) => handleChange(e, `/Landing/${currentUser.name}`)}
                          />
                          <Tab
                            label="기계"
                            value="/MachinePage"
                            component={Link}
                            to="/MachinePage"
                            style={{ textDecoration: 'none', ":hover":{textDecoration:"underline"},
                            fontWeight:"bold", color: 'white', marginRight: '4rem' ,
                            borderBottom: value === '/MachinePage' ? '2px solid white' : 'none', 
                            transition: 'border-bottom 0.3s ease',   
                           }}
                            onClick={(e) => handleChange(e, '/MachinePage')}
                          />
                          <Tab
                            label="온도"
                            value="/TemperaturePage"
                            component={Link}
                            to="/TemperaturePage"
                            style={{ textDecoration: 'none', ":hover":{textDecoration:"underline"},
                            fontWeight:"bold", color: 'white', marginRight: '4rem' ,
                            borderBottom: value === '/TemperaturePage' ? '2px solid white' : 'none', 
                            transition: 'border-bottom 0.3s ease',   
                           }}
                            onClick={(e) => handleChange(e, '/TemperaturePage')}
                          />
                          <Tab
                            label="불량품"
                            value="/Computervision"
                            component={Link}
                            to="/Computervision"
                            style={{ textDecoration: 'none', ":hover":{textDecoration:"underline"},
                            fontWeight:"bold", color: 'white', marginRight: '4rem' , 
                            borderBottom: value === '/Computervision' ? '2px solid white' : 'none', 
                            transition: 'border-bottom 0.3s ease',   
                           }}
                            onClick={(e) => handleChange(e, '/Computervision')} 
                          />
                          <Tab
                            label="관리자DB"
                            value="/Administrator"
                            component={Link}
                            to="/Administrator"
                            style={{ textDecoration: 'none', ":hover":{textDecoration:"underline"},
                            fontWeight:"bold", color: 'white', marginRight: '4rem' ,  
                            borderBottom: value === '/Administrator' ? '2px solid white' : 'none', 
                            transition: 'border-bottom 0.3s ease',   
                           }}
                            onClick={(e) => handleChange(e, '/Administrator')}
                          />
                        </>
                      )}
            
                      {isAuthenticated && currentUser && (
                        <>
                          <Tab 
                            label={
                              <Box display="flex" alignItems="center">
                                <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
                                <span style={{ color: 'white', fontWeight:'bold'}} >현재 관리자 : {name}</span>
                              </Box>
                            }
                            style={{textDecoration: "none", color: "white", marginLeft:"10rem"}}
                            />
                        </>
                      )}
                      <Box display='flex' marginLeft={'auto'}>
                        {isAuthenticated && 
                        <Button style={{ color: 'white'}} onClick={handleSubmitLogout}>Logout</Button>}
                      </Box>
                  </Tabs>
                </Box>
            </Box>
          </Toolbar>
          )}
          </AppBar>
              
            <Dialog open={open}>
              <DialogTitle>로그아웃</DialogTitle>
              <DialogContent>
                정말 로그아웃 하시겠습니까?
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" style={{ backgroundColor: '#5C6AC4', color: 'white' }} size="small" onClick={handleLogoutConfirm}>yes</Button>
                  <Button variant="contained" style={{ backgroundColor: '#5C6AC4', color: 'white' }} size="small" onClick={handleLogoutCancel}>cancel</Button>
              </DialogActions>
            </Dialog>
    </header>
 
   )
 }
 
 export default Header;