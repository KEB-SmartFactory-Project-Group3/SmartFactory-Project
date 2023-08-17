import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import useTimeRecorder from '../hooks/customMachine';
import useMachineCount from '../hooks/useMachineCount';
import FormDialog from './FormDialog';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import useMachineRate from '../hooks/useMachineRate';
import { styled } from '@mui/material/styles';
import { StyledBackground, StyledFactor } from '../stylescomp/BackgroundStyle';
import {OutlinedCard} from '../card/MachineCards';
import { Modal } from '@mui/material';
import { ModalStyled, GridItemStyled, SubmitContainer, 
        StyledTextField, ItemStyledChart, GridItemStyledChart, 
        ItemStyledCount, RateLabel, DigitalClockStyle, ItemStyledTime, 
        ButtonStyled, SubmitButtonStyled,GridContainerStyled, GridItemStyledTime ,ProductionItemStyled} from '../stylescomp/MachineStyle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';
import { CSSTransition } from 'react-transition-group';
import { FadeBox } from '../stylescomp/FadeinStyle';
import TargetDonutChart from '../Chart/TargetCountChart';
import CountLineChart from '../Chart/CountLineChart';
import RealTimeLineChart from '../Chart/RealTimeLineChart';
import LandingPage from './LandingPage';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BasicBars from '../Chart/CountLineChart';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { sendStartToBackend , sendResetToBackend, apiServer} from '../api/ApiService';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function MachinePage() {

  const handleStartAndNotifyBackend = async () => {
    handleStart(); // original function to start the machine

    const StartData = {
        state: 'start',
        userName: null,
        operationStopTime: null,
        operationTime: null,
        reason: null,
        count: null
    }

    try {
        await sendStartToBackend(StartData);
    } catch (error) {
        console.error("Error sending start command", error);
    }
};

  const handleResetAndNotifyBackend = async() => {
    resetTimer();

    const ResetData = {
      state: 'reset',
      userName: null,
      operationStopTime: null,
      operationTime: null,
      reason: null,
      count: null
  }

    try {
        await sendResetToBackend(ResetData);
    } catch (error) {
        console.error("Error sending reset command", error);
    }
  };
  
  const { isRunning, elapsedTime, restartTimer, startTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const {count, showAlert, setShowAlert,targetAchievement, targetCount, setTargetCount, handleTargetcountChange, handleTargetCountSubmit} = useMachineCount()
  const {nowRate} = useMachineRate()
  const [formOpen, setFormOpen] = useState(false)
 
  const [isCardOpen,setIsCardOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // reset 다이얼로그 상태
  const [openResetDialog, setOpenResetDialog] = useState(false)

  // Dialog 열기
  const handleOpenResetDialog = () => {
    setOpenResetDialog(true);
  };

  // Dialog 닫기
  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
  };

  // 실제 reset 수행 및 Dialog 닫기
  const handleConfirmReset = () => {
    handleResetAndNotifyBackend();
    setOpenResetDialog(false);
  };

  // 데이터 표시 여부
  const [showNoDataAlert, setShowNoDataAlert] = useState(false) 

  // 목표생산량 animateText
  const [animateText, setAnimateText] = useState(false)

  //현재 생산 속도
  const elapsedSeconds = elapsedTime / 1000 // 초 단위로 표시
  const currentRate = count / elapsedSeconds

  // 목표 달성까지 남은 시간 = (목표 생산량 - 현재 생산량) / 현재 생산 속도
  const remainingItems = targetCount - count
  const remainingSeconds = remainingItems / currentRate // 후에 formatTime 함수를 사용하여 시간, 분, 초 변환

  // alert 횟수
  const [alertCount, setAlertCount] = useState(0)

  useEffect(() => {
    if (showNoDataAlert || showAlert) {
      setAlertCount(prevCount => prevCount + 1);
    }
  }, [showNoDataAlert, showAlert])

  useEffect(() => {
    if (!submitted) return // 전송하지 않으면 실행 안 함

    if (isNaN(remainingSeconds) || count === 0 || targetCount === "" || targetCount == null )  {
      setShowNoDataAlert(true) 
    }
  }, [remainingSeconds,submitted,count, targetCount])

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

    setShowNoDataAlert(false)

    if (isNaN(targetCount) || targetCount === "") {
      // 입력값이 숫자가 아닐 경우 경고를 표시
      setShowAlert(true);
      return;
  }
    handleTargetCountSubmit()
    setSubmitted(true)
    setAnimateText(true); // 애니메이션 시작
    setTimeout(() => setAnimateText(false), 1000) // 지속 시간
  }

  const handleTextReset = () => {
    setSubmitted(false)
    setShowNoDataAlert(false) // 초기화
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
      <CSSTransition in={true} timeout={1000} classNames="fade" appear>
      <FadeBox sx={{flexGrow:1}}>
        <Grid container spacing={3} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyledCount borderColor="#b388ff">
              <RateLabel>도달률 <br/> {nowRate}%</RateLabel>
              <TargetDonutChart nowRate={nowRate} />
            </ItemStyledCount>
        </GridItemStyled>

        <GridItemStyled item xs={12} sm={4} md={4}>
            <ItemStyledCount borderColor='#ffeb3b'>
            <Typography variant="h6" sx={{marginBottom: '1rem'}}>
              목표 생산량
            </Typography>
            {submitted ? (
              <>
              <CSSTransition in={animateText} timeout={1000} classNames="fade" appear>
                {/* <div>{targetCount}</div> */}
                <div>
                  앞으로 남은 생산량 <br />
                  <span style={{ fontWeight: 'bold', color: '#0f0' }}>{targetCount - count}</span>
                  <Typography variant="body1">
                    예상 남은 시간: 
                    {
                      isNaN(remainingSeconds) 
                      ? ""
                      : formatTime(remainingSeconds * 1000)
                    }
                  </Typography>

                  <Snackbar 
                      open={showNoDataAlert} 
                      autoHideDuration={6000} 
                      onClose={() => setShowNoDataAlert(false)}
                      style={{ 
                        position: 'fixed', 
                        top: '55%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      <Alert onClose={() => setShowNoDataAlert(false)} severity="warning" variant="filled">
                        데이터값이 없습니다!
                      </Alert>
                    </Snackbar>
                </div>
              </CSSTransition>

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
              <SubmitButtonStyled
                variant="outlined"
                style={{ color: 'white', borderColor:'white'}}
                size="small"
                onClick={handleTextSubmit}
              >
                전송
              </SubmitButtonStyled>
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

        <GridItemStyled item xs={12} sm={4} md={4}>
          <GridContainerStyled container direction='column'>
            <GridItemStyledTime item xs={12}>
              <ItemStyledTime>
                <DigitalClockStyle variant='h3'>
                {formatTime(elapsedTime)}
                </DigitalClockStyle>
                </ItemStyledTime>
            </GridItemStyledTime> 

            <GridItemStyled  item xs={12}>
            {isRunning ? (
                  <ButtonStyled variant='outlined' borderWidth="3px" style={{fontWeight: 'bold', color:'green', borderColor: 'green'}}size='large' onClick={handleOpenForm}>
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
                     <ButtonStyled variant='outlined' borderWidth="3px" style={{fontWeight: 'bold' ,color:'blue', borderColor: 'blue'}}size="large" onClick={handleStartAndNotifyBackend}>
                          가동 시작
                      </ButtonStyled> 
                    </>
                )}
                <Tooltip title="데이터를 초기화합니다">
                 <ButtonStyled variant='outlined' borderWidth="3px" style={{fontWeight: 'bold',color:'red', borderColor: 'red' }}size='large' onClick={()=> {handleResetAndNotifyBackend(); handleOpenResetDialog();}}>
                    Reset
                </ButtonStyled>
                <FormDialog open={formOpen} handleClose={handleCloseForm} elapsedTime={elapsedTime} handleRestart={restartTimer} handleStop={handleStop}  />
                </Tooltip>

                <Dialog
                  open={openResetDialog}
                  onClose={handleCloseResetDialog}
                >
                  <DialogTitle>{"데이터 초기화"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      데이터를 초기화 합니다. 정말 reset 하시겠습니까?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseResetDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleConfirmReset} color="primary" autoFocus>
                      Reset
                    </Button>
                  </DialogActions>
                </Dialog>

          </GridItemStyled>
          </GridContainerStyled>
        </GridItemStyled>

        <Modal open={isCardOpen}>
          <ModalStyled isOpen={isCardOpen}>
            <OutlinedCard onClose={handleCardClick} />
          </ModalStyled>
        </Modal>
          
        <GridItemStyledChart item xs={8} sm={8} md={8}>
          <ItemStyledChart>
            차트
            <RealTimeLineChart targetCount={targetCount}/>
          </ItemStyledChart>
        </GridItemStyledChart>

         <GridItemStyled item xs={12} sm={4} md={4} onClick={handleCardClick}>
        {!isCardOpen && (
            <ProductionItemStyled>
            현재 생산량: {count}
            <BasicBars count={count} />
            </ProductionItemStyled>
          )}
        </GridItemStyled>

        <Badge badgeContent={alertCount} color="primary">
          <MailIcon />
        </Badge>
      </Grid>
      </FadeBox>
      </CSSTransition>
   </StyledFactor>
   </StyledBackground>

  );
}




export default MachinePage;