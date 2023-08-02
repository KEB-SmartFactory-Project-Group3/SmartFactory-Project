import { useParams } from 'react-router-dom';
import React from 'react';
import useMachine from '../hooks/useMachine';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function LandingPage() {

  // const {id} = useParams()
  const operationtime = useMachine()

  return (
    <div className="landing">
      {/* <h1>Welcome {id}</h1> */}
      <div className="operation-info">총 가동 시간 : {operationtime}</div>

      <Box sx={{ flexGrow: 10 }}>
        <Grid container spacing={6}>
          <Grid item xs>
            <Item>기계</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>온도</Item>
          </Grid>
          <Grid item xs>
            <Item>비전</Item>
          </Grid>
        </Grid>
      </Box>

    </div>

  )
}


export default LandingPage;