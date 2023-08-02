import React from 'react';
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
        <div>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }} >Not found</h1>
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }} >주소가 잘못되었습니다. 다시 확인해주세요.</h3>
        <Stack spacing={2} direction="row" alignItems="center">
          <Button variant="outlined" sx={{ width: '120px' }} onClick= {() => navigate(-1)}>뒤로가기</Button>
          <Button variant="outlined" sx={{ width: '180px' }} onClick={redirectLogin}>로그인 화면으로 이동</Button>
        </Stack>
        </div>
      </div>
    </Box>
  )
}

export default ErrorPage;
