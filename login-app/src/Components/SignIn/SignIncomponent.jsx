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
import Dialog from '@mui/material/Dialog';
import axios from 'axios';


function SignIncomponent() {

  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const [loginSuccess, setLoginSuccess] = useState(false)

  const navigate = useNavigate();
  const authContext = useAuth()

  function handleUsername(e) {
    setId(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }


  // 로그인  코딩
  function handleSubmit(e) {
    e.preventDefault();
    if (authContext.login(id, password)) {
      // 로그인 성공하면 landig page로 이동
      navigate(`/landing/${id}`)
    } else {
      //setLoginFailed(true)
      alert("다시 입력하세요!")
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
        {/* {loginFailed && <div className="erro">Failed</div> } */}


        <div className ="form">
          <div>
            <label>Username : </label>
            <input type="text" name = "id" placeholder = "아이디" required 
            value={id} onChange={handleUsername}/>
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

export default SignIncomponent;