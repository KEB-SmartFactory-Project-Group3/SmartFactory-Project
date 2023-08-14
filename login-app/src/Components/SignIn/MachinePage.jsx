import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import useTimeRecorder from '../hooks/customMachine';
import useMachineCount from '../hooks/useMachineCount';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormDialog from './FormDialog';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import useMachineRate from '../hooks/useMachineRate';
import { styled } from '@mui/material/styles';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import './MachinePage.css';
import CircularProgressWithLabel from '../Data/MachineData'
import {OutlinedCard} from '../card/MachineCards';
import { Modal } from '@mui/material';
import { ModalStyled, ItemStyled , GridItemStyled, SubmitContainer, StyledTextField} from '../stylescomp/MachineStyle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';


function MachinePage() {

  const { isRunning, elapsedTime, startTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const {count, showAlert, setShowAlert,targetAchievement, targetCount, setTargetCount, handleTargetcountChange, handleTargetCountSubmit} = useMachineCount()
  const {nowRate} = useMachineRate()
  const [formOpen, setFormOpen] = useState(false)
 
  const [isCardOpen,setIsCardOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleCardClick = () => {
    setIsCardOpen(!isCardOpen)
  }
  
  const handleOpenForm = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  };

  const handleTextSubmit = () => {

    if (isNaN(targetCount) || targetCount === "") {
      // 입력값이 숫자가 아닐 경우 경고를 표시
      setShowAlert(true);
      return;
  }
    handleTargetCountSubmit()
    setSubmitted(true)
  }

  const handleTextReset = () => {
    setSubmitted(false)
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000); // 시간
    const minutes = Math.floor((time % 3600000) / 60000); // 분
    const seconds = ((time % 60000) / 1000).toFixed(0); // 초
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <StyledBackground className='Machinepagelanding'>
    <StyledFactor className="MachinePage">
      <Box sx={{flexGrow:1}}>
        <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyled>
              도달량:  
              <CircularProgressWithLabel value={nowRate} />
            </ItemStyled>
        </GridItemStyled>

        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyled>
            <Typography variant="h6" sx={{marginBottom: '1rem'}}>
              목표 생산량
            </Typography>
            {submitted ? (
              <>
                <div>{targetCount}</div>
                <SubmitContainer>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#5C6AC4', color: 'white', marginLeft: '10px' }}
                    size="small"
                    onClick={handleTextReset}
                  >
                    재입력
                  </Button>
                </SubmitContainer>
              </>
            ) : (
              <>
            <StyledTextField 
              value={targetCount}
              onChange={(e) => handleTargetcountChange(e.target.value)}
              variant='outlined'
              size='small'
              helperText="목표 생산량을 입력해주세요"
              label="목표 생산량"
              />
              <SubmitContainer>
              <Button
                variant="contained"
                style={{ backgroundColor: '#5C6AC4', color: 'white', marginLeft: '10px' }}
                size="small"
                onClick={handleTextSubmit}
              >
                전송
              </Button>
              </SubmitContainer>
              </>
            )}
          </ItemStyled>
        </GridItemStyled>

        <Snackbar 
            open={showAlert} 
            autoHideDuration={6000} 
            onClose={() => setShowAlert(false)}
            style={{ 
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)' 
            }}
        >
            <Alert onClose={() => setShowAlert(false)} severity="error" variant="filled">
                유효한 값을 입력하세요.
            </Alert>
        </Snackbar>

        <GridItemStyled item xs={12} sm={4} md={4} onClick={handleCardClick}>
        {!isCardOpen && (
            <ItemStyled>
            현재 생산량: {count}
            </ItemStyled>
          )}
        </GridItemStyled>

        <Modal open={isCardOpen}>
          <ModalStyled isOpen={isCardOpen}>
            <OutlinedCard onClose={handleCardClick} />
          </ModalStyled>
        </Modal>

          <GridItemStyled item xs={12}>
            <ItemStyled>
              차트
            </ItemStyled>
          </GridItemStyled>

          <Grid item xs={12}>
            <Item  sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '300px',  
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        color: 'white'
            }}>가동시간:{formatTime(elapsedTime)}</Item>
          </Grid>
          <Grid item xs={12}>
            <Item  sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '10px', 
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px'
            }}>
            {isRunning ? (
                  <Button 
                    variant="outlined"
                    style={{ color: 'white', flex: 5, marginRight: '10px' , borderColor: '#263238'}} 
                    size="large"
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
                    variant="outlined"
                    style={{ color: 'white', flex: 5, marginRight: '10px' ,borderColor: '#263238' }} 
                    size="large"
                    onClick={() => {
                      handleStart();
                    }}
                  >
                    가동 시작
                  </Button>
            
                  <Button
                    variant="outlined"
                    style={{ color: 'white', flex: 5, marginRight: '10px' , borderColor: '#263238'}} 
                    size="large"
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
                  variant="outlined"
                  style={{ color: 'white', flex: 5, marginRight: '10px' ,borderColor: '#263238' }} 
                  size="large"
                  onClick={resetTimer}
                >
                  Reset
                </Button>

            </Item>
          </Grid>
       
        </Grid>
      </Box>
   </StyledFactor>
   </StyledBackground>
  );
}



export default MachinePage;