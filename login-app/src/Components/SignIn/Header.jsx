import React, { useEffect } from 'react';
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
import { Tabs, Tab, useTheme, useMediaQuery} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DrawerComp from './DrawerComp';


function Header(props) {
   
  const authContext = useAuth()
  //authContext에서 인증 정보를 가져와서 지역 변수에 넣음
  const isAuthenticated = authContext.isAuthenticated
  
  // 현재 관리자 가져오기
  const currentUser = authContext.currentUser
  const name = authContext.currentUser?.name // 로그인 api로 가져온 name

  const navigate = useNavigate()
  const [open,setOpen] = useState(false)

  // const theme = useTheme(theme.breakpoints.down('sm'))
  // const isMatch = useMediaQuery()
  // 활성 탭을 업데이트하는 구간
  const [value, setValue] = useState()

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
      <AppBar position="static" sx={{ backgroundColor: 'transparent'}} className="headerapp">
       <div className="container">
            <Toolbar>

             <Grid sx={{placeItems: "center"}} container>
                <Grid item xs={11}>
                  <Tabs value={value} 
                        onChange={handleChange} 
                        aria-label="nav tabs example"
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                    {isAuthenticated && (
                      <>
                        <Tab
                          label="Home"
                          value={`/Landing/${currentUser.name}`}
                          component={Link}
                          to={`/Landing/${currentUser.name}`}
                          style={{ textDecoration: 'none', color: '#3f51b5', marginRight: '4rem' ,  }}
                        />
                        <Tab
                          label="기계"
                          value="/MachinePage"
                          component={Link}
                          to="/MachinePage"
                          style={{ textDecoration: 'none', color: 'black', marginRight: '4rem' }}
                        />
                        <Tab
                          label="온도"
                          value="/TemperaturePage"
                          component={Link}
                          to="/TemperaturePage"
                          style={{ textDecoration: 'none', color: 'black', marginRight: '4rem' }}
                        />
                        <Tab
                          label="불량품"
                          value="/Computervision"
                          component={Link}
                          to="/Computervision"
                          style={{ textDecoration: 'none', color: 'black', marginRight: '4rem' }}
                        />
                        <Tab
                          label="관리자DB"
                          value="/Administrator"
                          component={Link}
                          to="/Administrator"
                          style={{ textDecoration: 'none', color: 'black', marginRight: '4rem' }}
                        />
                      </>
                    )}
           
                    {isAuthenticated && currentUser && (
                      <>
                        <Tab 
                          label={
                            <Box display="flex" alignItems="center">
                              <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
                              <span style={{ color: 'black' }} >현재 관리자 : {name}</span>
                            </Box>
                          }
                          style={{textDecoration: "none", color: "black", marginLeft:"15rem"}}
                          />
                      </>
                    )}

                </Tabs>
                
                </Grid>
               
                <Grid item xs={1}>
                  <Box display="flex">
                    {isAuthenticated && 
                    <Button onClick={handleSubmitLogout}>Logout</Button>}
                   </Box>
                </Grid>  
              </Grid>
            
              <DrawerComp />
            </Toolbar>
       </div>

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