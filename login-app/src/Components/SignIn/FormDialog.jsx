import React, { useState }from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FormDialog({ open, handleClose }) {
  const [selectedReason, setSelectedReason] = useState('')

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  }

  const handleReasonSubmit = () => {
    // 선택된 항목을 처리하는 로직 추가
    if (selectedReason) {
      console.log('Selected reason:', selectedReason)
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
