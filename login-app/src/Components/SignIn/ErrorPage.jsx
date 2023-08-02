import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

  const navigate = useNavigate();

  function redirectLogin() {
     navigate("/")
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
    >
      <div className="Errorpage">
        <ErrorIcon />
        <h1>Not found</h1>
        <h3>주소가 잘못되었습니다. 다시 확인해주세요.</h3>
        <Stack spacing={2} direction="row">
          <Button variant="outlined"onClick= {() => navigate(-1)}>뒤로가기</Button>
          <Button variant="outlined" onClick={redirectLogin}>로그인 화면으로 이동</Button>
        </Stack>
      </div>
    </Box>
  )
}

export default ErrorPage;
