import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';

function ErrorPage() {

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
        <h1>페이지가 없어요</h1>
        <h3>주소가 잘못되었습니다. 다시 확인해주세요.</h3>
      </div>
    </Box>
  )
}

export default ErrorPage;
