import React, { useState }from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FormDialog({ open, handleClose }) {
  const [checkedItems, setCheckedItems] = useState([])

  const handleCheckboxChange = (value) => {
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter(item => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
}
  const handleReasonSubmit = () => {
    // 선택된 항목들을 가공하여 처리하는 로직 추가
    console.log('Selected items:', checkedItems);
    handleClose();
  }

  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>가동 중지 원인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          가동 중지하는 이유를 선택해주세요
        </DialogContentText>
        <FormControlLabel
          control={<Checkbox />}
          label="휴식"
          onChange={() => handleCheckboxChange('휴식')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="교대"
          onChange={() => handleCheckboxChange('교대')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="고장"
          onChange={() => handleCheckboxChange('고장')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="점검"
          onChange={() => handleCheckboxChange('점검')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="사고"
          onChange={() => handleCheckboxChange('사고')}
        />
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose}>취소</button>
        <button onClick={handleReasonSubmit}>저장</button>
      </DialogActions>
    </Dialog>
  )
}
