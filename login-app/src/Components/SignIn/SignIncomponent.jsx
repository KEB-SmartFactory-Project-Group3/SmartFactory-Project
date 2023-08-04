import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import Button from '@mui/material/Button';
import './SignIn.css'

function SignIncomponent() {

  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth()

  function handelRememberMe(e) {
    setRememberMe(e.target.checked)
  }

  function handleUsername(e) {
    setId(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }


  // 로그인  코딩
  function handleSubmit(e) {
    e.preventDefault();

    if(isLoggingIn) return //이미 로그인 중이면 중복 실행 방지
    setIsLoggingIn(true)

    authContext.login(id, password).then((isLoginInSuccessful) => {
      setIsLoggingIn(false)
      if (isLoginInSuccessful) {
         // 로그인 성공하면 landig page로 이동
          navigate(`/landing/${id}`) 
      }else {
        alert("비밀번호가 틀렸습니다. 다시 입력하세요!")
      } 
      
      if (rememberMe) {
        localStorage.setItem("rememberMe",true)
        localStorage.setItem("rememberedUsername", id)
      }else {
        localStorage.removeItem("rememberMe")
        localStorage.removeItem("rememberedUsername")
      }

    }) 
    .catch((error) => {
      alert(error.message) //api 오류 처리
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#c5cae9',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
      <Avatar sx={{ m: 1}}>
        <LockIcon />
      </Avatar>
  
      <form className="loginform">
        {/* 로그인 인증 하드코딩 --세션으로 나중에 수정 */}
        {/* {loginFailed && <div className="erro">Failed</div> } */}
        <div sx = {{
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '250px',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item sx={ {mt: 1, ml: 8}}>
              <label style={{ color: '#1f2454'}}>Username : </label>
              <input type="text" name="id" placeholder="아이디" required value={id} onChange={handleUsername} />
            </Grid>
            <Grid item sx={ {ml: 8, mb:1}}>
              <label style={{ color: '#1f2454'}}>Password : </label>
              <input 
                type="password"
                name="password"
                placeholder="비밀번호"
                required
                value={password}
                onChange={handlePassword}
              />
            </Grid>
          </Grid>
          {/* 비밀번호를 기억하는 옵션 */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handelRememberMe} sx={{mt: 1, ml: 8}}/>}
            label="Remember me"
          /> */}
          {/* 서버 쪽으로 데이터 전송 */}
          <Button
            type="submit"
            name="loginbtn"
            variant="contained"
            style={{
              backgroundColor: '#5C6AC4',
              color: '#c6caee',
              width: '80px',
              height: '30px',
              marginTop: '10px',
              borderRadius: '10px',
              marginLeft: '145px'
            }}
            size="small"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </form>
      <Grid container >
        <Grid item sx={{ mt: 2, ml: 11 }}>
          <Link style={{ color: 'white' }}>비밀번호를 잊어버리셨나요?</Link>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
}

export default SignIncomponent;
