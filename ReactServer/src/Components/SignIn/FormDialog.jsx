import React, { useState ,  useEffect }from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, RadioGroup, FormControlLabel, Radio, Button as MuiButton } from '@mui/material';
import { useAuth } from './security/AuthContext';
import useTimeRecorder from '../hooks/customMachine'; 
import axios from 'axios';
import { styled } from '@mui/material/styles';
import useMachineCount from '../hooks/useMachineCount';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(255,255,255,0.1)', 
    backdropFilter: 'blur(8px)', 
    borderRadius: '5px',  
    color: 'white',
  }
}));

const StyledButton = styled(MuiButton)({
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#f2f2f2'
  }
});

const WhiteRadio = styled(Radio)({
  '&.Mui-checked': {
    color: 'white',
  },
});

const StyledDialogContentText = styled(DialogContentText)({
  color: 'white',
});

export default function FormDialog({ open, handleClose, handleRestart, handleStop, name , elapsedTime}) {

  // const operationStartTime = useMachine()
  const authContext = useAuth()
  const {count} = useMachineCount()
  const { elapsedTime : customMachineElapsedTime} = useTimeRecorder()
  const [selectedReason, setSelectedReason] = useState('')
  const [formattedOperationTime, setFormattedOperationTime] = useState('') 

  // const [initialElapsedTime, setInitialElapsedTime] = useState(null);
  // const [differenceInElapsedTime, setDifferenceInElapsedTime] = useState(null);
  // const [formattedOperationStopTime, setFormattedOperationStopTime] = useState(null)

  // useEffect(() => {
  //     if (open && initialElapsedTime === null) {
  //         // 처음 열렸을 때의 elapsedTime 값을 저장합니다.
  //         setInitialElapsedTime(elapsedTime);
  //     }
  //     if (open && initialElapsedTime !== null) {
  //         // elapsedTime의 변화량을 계산합니다.
  //         const difference = elapsedTime - initialElapsedTime;
  //         setDifferenceInElapsedTime(difference);
  //         // 그리고 이 차이를 원하는 형식으로 변환하여 formattedOperationStopTime에 저장합니다.
  //         const formattedDifference = formatTime(difference);
  //         setFormattedOperationStopTime(formattedDifference);
  //     }
  // }, [open, elapsedTime]);



  const operationStopTimeMillis = Date.now(); // 밀리초로 현재 시간 가져오기
  const operationStopDate = new Date(operationStopTimeMillis);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formattedOperationStopTime = formatDate(operationStopDate);


  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000); // 시간
    const minutes = Math.floor((time % 3600000) / 60000); // 분
    const seconds = ((time % 60000) / 1000).toFixed(0); // 초
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (open) {
      setFormattedOperationTime(formatTime(elapsedTime));
    }
  }, [open,elapsedTime]);

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  }

  const apiServer = axios.create({
    baseURL: 'http://192.168.43.183:8080',
    withCredentials: true, //쿠키 자동 포함
  })

  //백엔드 api데이터 전송
  const handleReasonSubmit = async () => {
    // 선택된 항목을 처리하는 로직 추가
    if (selectedReason) {
      try {
        const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        console.log('Selected reason:', selectedReason)
        const name = authContext.currentUser && authContext.currentUser.name
        const operationStopTime = formattedOperationStopTime;
        const operationTime = formattedOperationTime; 
        // const operationTime = '04:05:30'; 
        const reason = selectedReason;
        const countValue = count; 
        const state = 'stop';

        console.log(name)
        console.log(operationStopTime)
        console.log(operationTime)
        console.log(reason)

        const requestData = {
          userName: name,
          operationStopTime,
          operationTime,
          reason,
          count: countValue,
          state,
        };

        const response = await apiServer.post('/click/stopbutton',requestData, config)
       if (response.status === 200) {
        console.log('Data posted successfully:', response.data);
        } else {
          console.log('Error while posting data');
        }
      } catch (error) {
        console.error('Error while posting data:', error)
      } 
    }
    handleClose()
  }


  return (
    <StyledDialog open={open} onClose={handleClose} >
      <DialogTitle>가동 중지 원인</DialogTitle>
      <DialogContent>
        <StyledDialogContentText>
          가동 중지하는 이유를 선택해주세요
        </StyledDialogContentText>
        <RadioGroup value={selectedReason} onChange={handleReasonChange}>
        <FormControlLabel
            value="휴식"
            control={<WhiteRadio />}
            label="휴식"
          />
          <FormControlLabel
            value="도달"
            control={<WhiteRadio />}
            label="도달"
          />
          <FormControlLabel
            value="고장"
            control={<WhiteRadio  />}
            label="고장"
          />
          <FormControlLabel
            value="점검"
            control={<WhiteRadio  />}
            label="점검"
          />
          <FormControlLabel
            value="사고"
            control={<WhiteRadio  />}
            label="사고"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={()=>{handleClose()
                              handleRestart()}}>취소</StyledButton>
        <StyledButton onClick={()=>{handleReasonSubmit()
                              handleStop()}}>저장</StyledButton>
      </DialogActions>
    </StyledDialog>
  )
}
