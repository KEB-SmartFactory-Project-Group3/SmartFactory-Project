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
import { ModalStyled, ItemStyled , GridItemStyled, SubmitContainer, StyledTextField, ItemStyledChart, GridItemStyledChart, ItemStyledCount, ItemStyledButton, DigitalClockStyle, ItemStyledTime, ButtonStyled, GridContainerStyled} from '../stylescomp/MachineStyle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';
import BasicColor from '../Chart/TargetCounChart';
import {motion} from 'framer-motion';


function MachinePage() {

  const { isRunning, elapsedTime, restartTimer, startTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
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
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 1.5}}
    >
    <StyledBackground className='Machinepagelanding'>
    <StyledFactor className="MachinePage">
      <Box sx={{flexGrow:1}}>
        <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyledCount>
              도달량:  
              <CircularProgressWithLabel value={nowRate} />
            </ItemStyledCount>
        </GridItemStyled>

        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyledCount>
            <Typography variant="h6" sx={{marginBottom: '1rem'}}>
              목표 생산량
            </Typography>
            {submitted ? (
              <>
                <div>{targetCount}</div>
                <SubmitContainer>
                  <ButtonStyled
                    variant="outlined"
                    style={{ color: 'white', borderColor:'white'}}
                    size="small"
                    onClick={handleTextReset}
                  >
                    재입력
                  </ButtonStyled>
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
              <ButtonStyled
                variant="outlined"
                style={{ color: 'white', borderColor:'white'}}
                size="small"
                onClick={handleTextSubmit}
              >
                전송
              </ButtonStyled>
              </SubmitContainer>
              </>
            )}
          </ItemStyledCount>
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
            <ItemStyledCount>
            현재 생산량: {count}
            </ItemStyledCount>
          )}
        </GridItemStyled>

        <Modal open={isCardOpen}>
          <ModalStyled isOpen={isCardOpen}>
            <OutlinedCard onClose={handleCardClick} />
          </ModalStyled>
        </Modal>
          
        <GridItemStyledChart item xs={8} sm={8} md={8}>
          <ItemStyledChart>
            차트
            <BasicColor />
          </ItemStyledChart>
        </GridItemStyledChart>

        <Grid item xs={4} sm={4} md={4}>
          <GridContainerStyled container direction='column'>
            <GridItemStyled item xs={12}>
              <ItemStyledTime>
                <DigitalClockStyle variant='h3'>
                {formatTime(elapsedTime)}
                </DigitalClockStyle>
                </ItemStyledTime>
            </GridItemStyled> 

            <GridItemStyled  item xs={12}>
            {isRunning ? (
                  <ButtonStyled variant='outlined' style={{color:'white', borderColor: 'white'}}size='small' onClick={handleOpenForm}>
                    가동중지
                  </ButtonStyled>
                  ) : formOpen ? (
                    <>
                      <ButtonStyled variant='outlined' style={{color:'white', borderColor: 'white'}}size="small"onClick={handleStart}>
                        재가동
                      </ButtonStyled>
                    </>
                  ) : (
                    <>
                     <ButtonStyled variant='outlined' style={{color:'white', borderColor: 'white'}}size="small" onClick={handleStart}>
                          가동 시작
                      </ButtonStyled> 
                    </>
                )}
                 <ButtonStyled variant='outlined' style={{color:'white', borderColor: 'white'}}size='small' onClick={resetTimer}>
                    Reset
                </ButtonStyled>
                <FormDialog open={formOpen} handleClose={handleCloseForm} elapsedTime={elapsedTime} handleRestart={restartTimer} handleStop={handleStop}  />

          </GridItemStyled>

          </GridContainerStyled>
        </Grid>
      </Grid>
      </Box>
   </StyledFactor>
   </StyledBackground>
   </motion.div>
  );
}



export default MachinePage;