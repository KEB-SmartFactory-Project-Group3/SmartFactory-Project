import React, { useState ,  useEffect }from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from './security/AuthContext';
import useTimeRecorder from '../hooks/customMachine'; 
import axios from 'axios'

export default function FormDialog({ open, handleClose, handleRestart, handleStop, name , elapsedTime}) {
  // const operationStartTime = useMachine()
  const authContext = useAuth()
  // const {count} = useMachineCount()
  const { elapsedTime : customMachineElapsedTime} = useTimeRecorder()
  const [selectedReason, setSelectedReason] = useState('')
  const [formattedOperationTime, setFormattedOperationTime] = useState('') 


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
    baseURL: 'http://172.20.10.3:8080',
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
        const countValue = 0; 
        const state = 'start';

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

        const response = await apiServer.post('/api/display/button',requestData, config)
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>가동 중지 원인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          가동 중지하는 이유를 선택해주세요
        </DialogContentText>
        <RadioGroup value={selectedReason} onChange={handleReasonChange}>
        <FormControlLabel
            value="휴식"
            control={<Radio />}
            label="휴식"
          />
          <FormControlLabel
            value="교대"
            control={<Radio />}
            label="교대"
          />
          <FormControlLabel
            value="고장"
            control={<Radio />}
            label="고장"
          />
          <FormControlLabel
            value="점검"
            control={<Radio />}
            label="점검"
          />
          <FormControlLabel
            value="사고"
            control={<Radio />}
            label="사고"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <button onClick={()=>{handleClose()
                              handleRestart()}}>취소</button>
        <button onClick={()=>{handleReasonSubmit()
                              handleStop()}}>저장</button>
      </DialogActions>
    </Dialog>
  )
}
