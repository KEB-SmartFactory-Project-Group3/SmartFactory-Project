import React, { useState } from 'react';
//import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
//import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
//import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { blue, green } from '@mui/material/colors';
import './SignIn.css'
import { BrowserRouter, Routes, Route , useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';



function SignIn() {
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

function SignIncomponent() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)

  const navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  // 로그인 하드 코딩
  function handleSubmit(e) {
    e.preventDefault();
    if (username === "12193152" && password === "dabin") {
      console.log("Success")
      setLoginSuccess(true)
      setLoginFailed(false)
      // 로그인 성공하면 landig page로 이동
      navigate(`/landing/${username}`) 
    } else {
      console.log("Failed")
      setLoginSuccess(false)
      setLoginFailed(true)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Avatar sx={{ m: 1}}>
      <LockIcon />
      </Avatar>
  
      <form className = "loginform">
        {/* 로그인 인증 하드코딩 --세션으로 나중에 수정 */}
        {loginSuccess && <div className="success">Successfully</div>}
        {loginFailed && <div className="erro">Failed</div> }


        <div className ="form">
          <div>
            <label>Username : </label>
            <input type="text" name = "username" placeholder = "아이디" required 
            value={username} onChange={handleUsername}/>
          </div>
          <div>
            <label>Password : </label>
            <input type="password" name = "password" placeholder="비밀번호" required
            value={password} onChange={handlePassword} />
          </div>
          {/* 비밀번호를 기억하는 옵션 */}
          <FormControlLabel control={<Checkbox value="remember" color="primary" />}
          label="Remember me" />
          {/* 서버 쪽으로 데이터 전송 */}
          <button type="submit" name ="loginbtn" onClick={handleSubmit}>Login</button>
        </div>
      </form>
      <Grid container >
        <Grid item sx={{mt:2, ml:13}}>
        <Link>비밀번호를 잊어버리셨나요?</Link>
        </Grid>
      </Grid>
      </Box>
      </Container>
  );
}


function LandingPage() {
 
  const {username} = useParams()

  return (
    <div className="landing">
      <h1>Welcome {username}</h1>
    
    </div>
  )
}

function ErrorPage() {
  return (
    <div className="Errorpage">
      <h1>error!</h1>
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

function LogoutPage() {
  return (
    <div className="LogoutPage">
      <h1>로그아웃</h1>
    </div>
  )
}

function Header() {

 const navigate = useNavigate()

  // 로그아웃 하드 코딩
  function handleSubmitLogout(e) {
   e.preventDefault();
   // 로그아웃 성공하면 로그아웃 페이지로 이동
   // mui 사용하면 필요없어짐
  navigate(`/Logout`) 
  }
  return (
    <header className="header">
       <AppBar position="static" sx={{ backgroundColor: 'transparent'}} className="headerapp">
      <div className="container">
        <Toolbar>
          <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center' ,listStyle: 'none'}}>
          
            <li style={{marginRight: '1rem'}} className="nav-item"><Link className="nav-link" to="/Landing/:username">Home</Link></li>
            <li style={{marginRight: '1rem'}} className="nav-item"><Link className="nav-link" to="/MachinePage">기계</Link></li>
            <li style={{marginRight: '1rem'}} className="nav-item"><Link className="nav-link" to="/TemperaturePage">온도</Link></li>
            <li style={{marginRight: '1rem'}} className="nav-item"><Link className="nav-link" to="/Computervision">불량품</Link></li>
            <li style={{marginRight: '1rem'}} className="nav-item"><Link className="nav-link" to="/Administrator">관리자DB</Link></li>
           
          </ul>
          <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
            <li className="nav-item"><Button onClick={handleSubmitLogout}>Logout</Button></li>
          </ul>
        </Toolbar>
      </div>
    </AppBar>
   </header>



  )
}

export default SignIn;
