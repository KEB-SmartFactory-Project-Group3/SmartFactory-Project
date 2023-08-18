import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import {StyledSignInContainer, StyledGridItem, StyledBox , StyledLoginButton} from '../stylescomp/SignInStyles'
import Grid from '@mui/material/Grid';


function SignIncomponent() {

  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth()


  // function handelRememberMe(e) {
  //   setRememberMe(e.target.checked)
  // }

  function handleUsername(e) {
    setId(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 임시로 하드코딩된 로그인 처리
    if (id === 'dabin' && password === '123') {
      authContext.login(id, password).then((isLoginSuccessful) => {
        if (isLoginSuccessful) {
          // 로그인 성공 시 landig page로 이동
          navigate(`/landing/${id}`);
        } else {
          alert('비밀번호가 틀렸습니다. 다시 입력하세요!');
        }
      });
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  }
  
  // 로그인  코딩
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if(isLoggingIn) return //이미 로그인 중이면 중복 실행 방지
  //   setIsLoggingIn(true)

  //   authContext.login(id, password).then((isLoginInSuccessful) => {
  //     setIsLoggingIn(false)
  //     if (isLoginInSuccessful) {
  //        // 로그인 성공하면 landig page로 이동
  //         navigate(`/landing/${id}`) 
  //     }else {
  //       alert("비밀번호가 틀렸습니다. 다시 입력하세요!")
  //     } 
      
  //     if (rememberMe) {
  //       localStorage.setItem("rememberMe",true)
  //       localStorage.setItem("rememberedUsername", id)
  //     }else {
  //       localStorage.removeItem("rememberMe")
  //       localStorage.removeItem("rememberedUsername")
  //     }

  //   }) 
  //   .catch((error) => {
  //     alert(error.message) //api 오류 처리
  //   })
  // }


  return (
    <StyledSignInContainer>
      <video autoPlay loop muted style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', overflow:'Hidden'}}>
        <source src="robot_-_3975 (Original).mp4" type="video/mp4"></source> 
      </video>
      <form className="loginform">
      <StyledBox>

       <Typography variant="h5" sx={{ fontFamily: 'Moirai One, cursive', fontWeight: 'bold', color: '#ffffff', marginBottom: '20px', marginTop: '5px' }}>Login</Typography>
            <StyledGridItem item xs={12}>
              <AccountBoxIcon sx={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 70, marginBottom: 0}} />
              <TextField 
                label="Username"
                required
                name = "id"
                value ={id}
                placeholder="아이디"
                onChange={handleUsername}
                sx={{
                  width: '250px',
                  borderRadius: '5px', 
                  '& input': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', //필드 내부 색상
                    borderRadius: '5px'
                  },
                }}/>
            </StyledGridItem>
            <StyledGridItem>
              <LockIcon sx={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 70  }} />
              <TextField 
                label="Password"
                type="password"
                required
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePassword}
                sx={{
                  width: '250px', 
                  borderRadius: '5px',
                  '& input': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', //필드 내부 색상
                    borderRadius: '5px'
                  },
                }}
                />
              </StyledGridItem>
      
          {/* 비밀번호를 기억하는 옵션 */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handelRememberMe} sx={{mt: 1, ml: 8}}/>}
            label="Remember me"
          /> */}
          {/* 서버 쪽으로 데이터 전송 */}
          <StyledLoginButton
            type="submit"
            name="loginbtn"
            variant="contained"
            size="small"
            onClick={handleSubmit}
          >
            Login
          </StyledLoginButton>
     
        </StyledBox>
      </form>
      {/* <Grid container >
        <Grid item sx={{ mt: 2, ml: 11 }}>
          <Link className="linkWrapper" style={{ textDecoration: "none"}}>비밀번호를 잊어버리셨나요?</Link>
        </Grid>
      </Grid> */}
  </StyledSignInContainer>
  );
}

export default SignIncomponent;
