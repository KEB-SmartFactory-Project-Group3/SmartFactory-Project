// MachineCards.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CountLineChart from '../Chart/CountLineChart';
import useMachineCount from '../hooks/useMachineCount';

export const OutlinedCard = () => {
  const { count } = useMachineCount();

  return (
    <Box sx={{ 
          minWidth: 275, 
          maxWidth: '100%',
          padding: '10px',
          boxSizing: 'border-box' // 패딩 때문에 넘치는 것을 방지
    }}>
      <Card  variant="outlined"
          sx={{
                background: 'transparent',
                border: '1px solid white',
                boxShadow: 'none', // 그림자 제거
                mt: 1,  // marginTop: '10px'
                ml: 2, // marginLeft: '15px'
                mr: 2, // marginRight: '15px'
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="white">
            현재 생산량 : {count}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <CountLineChart data={count} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
