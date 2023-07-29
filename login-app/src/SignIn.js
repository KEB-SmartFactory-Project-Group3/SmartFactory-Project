import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BackHandIcon from '@mui/icons-material/BackHand';
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
      <Avatar sx={{ m: 1, bgcolor: blue[500]}}>
      <BackHandIcon />
      </Avatar>
      <Typography component="h1" variant="h5"sx={{mb:3}}>
            Sign In
          </Typography>

      <TextField label="아이디" required fullWidth 
      name="id" autoComplete='email' autoFocus sx={{mb:3}}/>
      <TextField label="비밀번호" type='password'required fullWidth name="password"
      autoComplete='current-password'/>
      {/* 비밀번호를 기억하는 옵션 */}
      <FormControlLabel control={<Checkbox value="remember" color="primary" />}
      label="Remember me" />
      {/* 서버 쪽으로 데이터 전송 */}
      <button type='submit' fullWidth variant="contained" sx={{mt:3, mb:2}}>
        Sign In</button> 
      <Grid container>
        <Grid item sx={{mt:2}}>
        <Link>비밀번호를 잊어버리셨나요?</Link>
        </Grid>
      </Grid>
      </Box>
      </Container>
  );
}

export default App;
