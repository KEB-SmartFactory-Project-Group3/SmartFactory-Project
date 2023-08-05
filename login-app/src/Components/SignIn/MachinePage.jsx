import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import useMachine from '../hooks/useMachine';
import useTimeRecorder from '../hooks/customMachine';
import useMachineCount from '../hooks/useMachineCount';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormDialog from './FormDialog';
import Paper from '@mui/material/Paper';


function MachinePage() {

  const { isRunning, elapsedTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const operationTime = useMachine()
  const {production, targetAchievement, targetProduction, handleTargetProductionChange} = useMachineCount()

  const [formOpen, setFormOpen] = useState(false)

  const handleOpenForm = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  };

  const formatTime = (time) => {
    // 시간을 분:초 형식으로 포맷팅하는 함수
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="MachinePage">
       <Grid container spacing={3}>
        <Grid item xs={4} md = {4}>
          <Box sx={{p:6.5}}>
            <Paper 
                sx={{
                  height: 550,
                  width: 350,
                  backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
              <item>
                <Box sx={{ '& button': { m: 0.5 } }}>
                  <h1>A</h1>
                  <div className="targetAchievement-info">도달량 : {targetAchievement}</div>
                  <div className="targetProduction-info">목표 생산량 : {targetProduction}</div>
                  <div className="operation-info">총 가동 시간 : {operationTime}</div>
                  <div className="production-info">생산량 : {production}</div> 
                  <p>가동중지: {formatTime(elapsedTime)}</p>
                <div>
                {isRunning ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                    sx={{ width: '20px' }}
                    size="small"
                    onClick={handleStop}
                  >
                    Stop
                  </Button>
                  ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                    sx={{ width: '20px' }}
                    size="small"
                    onClick={() => {
                      handleStart();
                      handleOpenForm();
                    }}
                  >
                    Start
                  </Button>
                )}
                <FormDialog open={formOpen} handleClose={handleCloseForm} />
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
          <Grid item xs={4} md ={4}>
            <Box sx={{p:6.5}}>
              <Paper
                  sx = {{
                    height: 550,
                    width: 350,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}
                >
              <item>
              <Box sx={{ '& button': { m: 0.5 } }}>
                <h1>B</h1>
                <div className="targetAchievement-info">도달량 : {targetAchievement}</div>
                <div className="targetProduction-info">목표 생산량 : {targetProduction}</div>
                <div className="operation-info">총 가동 시간 : {operationTime}</div>
                <div className="production-info">생산량 : {production}</div> 
                <p>가동중지: {formatTime(elapsedTime)}</p>
               <div>
              {isRunning ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                  sx={{ width: '20px' }}
                  size="small"
                  onClick={handleStop}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                  sx={{ width: '20px' }}
                  size="small"
                  onClick={() => {
                    handleStart();
                    handleOpenForm();
                  }}
                >
                  Start
                </Button>
              )}
              <FormDialog open={formOpen} handleClose={handleCloseForm} />
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
          <Grid item xs={4} md={4}>
            <Box sx={{p:6.5}}>
              <Paper
                  sx = {{
                    height: 550,
                    width: 350,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}
                >
              <item>
              <Box sx={{ '& button': { m: 0.5 } }}>
                <h1>C</h1>
                <div className="targetAchievement-info">도달량 : {targetAchievement}</div>
                <div className="targetProduction-info">목표 생산량 : {targetProduction}</div>
                <div className="operation-info">총 가동 시간 : {operationTime}</div>
                <div className="production-info">생산량 : {production}</div> 
                <p>가동중지: {formatTime(elapsedTime)}</p>
               <div>
              {isRunning ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                  sx={{ width: '20px' }}
                  size="small"
                  onClick={handleStop}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#5C6AC4', color: 'white' }}
                  sx={{ width: '20px' }}
                  size="small"
                  onClick={() => {
                    handleStart();
                    handleOpenForm();
                  }}
                >
                  Start
                </Button>
              )}
              <FormDialog open={formOpen} handleClose={handleCloseForm} />
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