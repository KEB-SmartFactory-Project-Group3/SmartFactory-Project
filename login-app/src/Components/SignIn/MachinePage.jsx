import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import useTimeRecorder from '../hooks/customMachine';
import useMachineCount from '../hooks/useMachineCount';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormDialog from './FormDialog';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import useMachineRate from '../hooks/useMachineRate';
// import './MachinePage.css';


function MachinePage() {

  const { isRunning, elapsedTime, startTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const {count, targetAchievement, targetCount, setTargetCount, handleTargetcountChange, handleTargetCountSubmit} = useMachineCount()
  const {nowRate} = useMachineRate()
  const [formOpen, setFormOpen] = useState(false)

  const handleOpenForm = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000); // 시간
    const minutes = Math.floor((time % 3600000) / 60000); // 분
    const seconds = ((time % 60000) / 1000).toFixed(0); // 초
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="MachinePage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <Grid container spacing={2}>
    
        <Grid item xs={4}
           width={{xs:"350px", sm: "450px", md: "600px", lg:"800px", xl: "1000px"}} 
           height={{xs:"500px", sm:"500px", md:"600px", lg:"700px"}}>
          <Box>
            <Paper 
                sx={{
                  height: 300,
                  width: 400,
                  backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ?  '#fffdeb' : '#fffdeb',
                }}
              >
              <item>
                <Box sx={{ '& button': { m: 0.5 } }}>
                  <h1>A</h1>
                  <div className="targetAchievement-info">도달량 : {nowRate}</div>
                  <div className="targetProduction-info">
                      목표 생산량 : {''}
                      <TextField 
                        value={targetCount}
                        onChange={(e) => handleTargetcountChange(e.target.value)}
                        variant='outlined'
                        size='small'
                        />
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#5C6AC4', color: 'white', marginLeft: '10px' }}
                          size="small"
                          onClick={handleTargetCountSubmit}
                        >
                          전송
                        </Button>
                        </div>
                  <div className="operation-info">가동 시간 : {formatTime(elapsedTime)}</div>
                  <div className="production-info">생산량 : {count}</div> 
                  {/* <p>가동중지: {formatTime(elapsedTime)}</p> */}
              <div>
                {isRunning ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                    sx={{ width: '20px' }}
                    size="small"
                    onClick={() => {
                      handleStop()
                      handleOpenForm();
                    }}
                  >
                    가동중지
                  </Button>
                  ) : (
                    <>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                    sx={{ width: '20px' }}
                    size="small"
                    onClick={() => {
                      handleStart();
                    }}
                  >
                    가동 시작
                  </Button>
            
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                    size="small"
                    onClick={()=> {
                      handleStart()
                    }} // Start the timer
                  >
                  재가동
                  </Button>
                  </>
                )}
                <FormDialog open={formOpen} handleClose={handleCloseForm} elapsedTime={elapsedTime} />
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                  sx={{ width: '20px' , marginRight: '10px'}}
                  size="small"
                  onClick={resetTimer}
                >
                  Reset
                </Button>
                </div>
                </Box>
              </item>
          </Paper>
          </Box>
        </Grid>
      </Grid>
  </div>
  );
}



export default MachinePage;