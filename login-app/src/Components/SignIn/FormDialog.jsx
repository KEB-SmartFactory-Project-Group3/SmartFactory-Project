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

export default function FormDialog({ open, handleClose, name }) {
  // const operationStartTime = useMachine()
  const authContext = useAuth()
  // const {count} = useMachineCount()
  const { elapsedTime: customMachineElapsedTime } = useTimeRecorder()
  const [selectedReason, setSelectedReason] = useState('')
  const [formattedOperationTime, setFormattedOperationTime] = useState('')

  const formatTime = (time) => {
    // 시간을 분:초 형식으로 포맷팅하는 함수
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (open) {
      setFormattedOperationTime(formatTime(customMachineElapsedTime));
    }
  }, [open,customMachineElapsedTime]);

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  }

  //백엔드 api데이터 전송
  const handleReasonSubmit = async () => {
    // 선택된 항목을 처리하는 로직 추가
    if (selectedReason) {
      try {
        console.log('Selected reason:', selectedReason)
        const name = authContext.currentUser && authContext.currentUser.name
        const response = await axios.post('/api/display/button', {
          selectedReason,
          name,
          elapsedTime: customMachineElapsedTime,
          // count,
          reason: 'start'
       })
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
        <button onClick={handleClose}>취소</button>
        <button onClick={handleReasonSubmit}>저장</button>
      </DialogActions>
    </Dialog>
  )
}
