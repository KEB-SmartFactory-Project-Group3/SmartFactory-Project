import React from 'react';
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

function App() {
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
      <form id = "loginform">
        <div id ="form">
          <label>Username : </label>
          <input type="text" placeholder = "아이디" required />
        </div>
        <div>
          <label>Password : </label>
          <input type="password" placeholder="비밀번호" required />
        </div>
        {/* 비밀번호를 기억하는 옵션 */}
        <FormControlLabel control={<Checkbox value="remember" color="primary" />}
        label="Remember me" />
        {/* 서버 쪽으로 데이터 전송 */}
        <button type="submit" id ="loginbtn">Login</button>
      </form>
      <Grid container>
        <Grid item sx={{mt:2, ml:13}}>
        <Link>비밀번호를 잊어버리셨나요?</Link>
        </Grid>
      </Grid>
      </Box>
      </Container>
  );
}

export default App;
