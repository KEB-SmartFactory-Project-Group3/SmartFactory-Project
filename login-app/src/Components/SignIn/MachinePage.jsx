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
import { styled } from '@mui/material/styles';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import './MachinePage.css';
import CircularProgressWithLabel from '../Data/MachineData'
import {OutlinedCard} from '../card/MachineCards';
import { Modal } from '@mui/material';



function MachinePage() {

  const { isRunning, elapsedTime, startTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const {count, targetAchievement, targetCount, setTargetCount, handleTargetcountChange, handleTargetCountSubmit} = useMachineCount()
  const {nowRate} = useMachineRate()
  const [formOpen, setFormOpen] = useState(false)
 
  const [isCardOpen,setIsCardOpen] = useState(false)

  const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '80%',
    padding: '16px',
    outline: 'none',
   
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    // opacity: 0,
    '&.open': {
      opacity: isCardOpen ? 1 : 0,
      transform: 'translate(-50%, -50%) scale(1)',
    }
  };

 

  const handleCardClick = () => {
    setIsCardOpen(!isCardOpen)
  }
  
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
        <Grid item xs={12} sm={4} md={4}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backdropFilter = 'blur(15px)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.transition = 'transform 0.3s, backdrop-filter 0.3s';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.backdropFilter = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.transition = 'transform 0.3s, backdrop-filter 0.3s';
                }}>
            <Item  sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '10px',  
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        color: 'white'
            }}>도달량:  <CircularProgressWithLabel value={nowRate} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={4} md={4}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backdropFilter = 'blur(15px)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.transition = 'transform 0.3s, backdrop-filter 0.3s';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.backdropFilter = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.transition = 'transform 0.3s, backdrop-filter 0.3s';
                }}>
              <Item sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '10px',  
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        color: 'white'
                }}>
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
            </Item>
          </Grid>

          <Grid item xs={12} sm={4} md={4} onClick={handleCardClick}>
          {!isCardOpen && (
            <Item sx={{
              background: 'transparent',
              border: '1px solid white',
              boxShadow: 'none', // 그림자 제거
              marginTop: '10px',  
              marginLeft: '15px',
              marginRight: '15px',
              borderRadius: '5px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              transition: 'background 0.3s, backdrop-filter 0.3s',
              padding: '1rem',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
      }}>
              현재 생산량: {count}
            </Item>
            )}
          </Grid>
          <Modal
            open={isCardOpen}
            onClose={handleCardClick} // Close the modal when backdrop is clicked.
          >
            <div style={modalStyle} className={isCardOpen ? 'open' : ''}>
              <OutlinedCard />
            </div>
          </Modal>


          {/* <Grid item xs={12} sm={4} md={4}
                onClick={handleCardClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'scale(1.3)',
                    transition: 'transform 0.3s',
                  },
                }}
                >
              {!isCardOpen && (
              <Item sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '10px',  
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        color: 'white',
                        transition: 'background 0.3s, backdrop-filter 0.3s',
                        padding: '1rem',
                        width: '100%',
                        textAlign: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        // maxHeight: isCardOpen ? '1000px' : '45px',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                        },
                }}>
                현재 생산량: {count}
              </Item> 
              )}
              {isCardOpen && <OutlinedCard />}
          </Grid> */}

      
  
          <Grid item xs={12}>
            <Item sx={{
                        background: 'transparent',
                        border: '1px solid white',
                        boxShadow: 'none', // 그림자 제거
                        marginTop: '10px',  
                        marginLeft: '15px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        color: 'white'
            }}>
              차트
            </Item>
          </Grid>
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