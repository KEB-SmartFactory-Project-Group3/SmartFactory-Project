import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog({ open, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const handleSubscribe = () => {
    // 여기서 구독(subscribe) 버튼을 눌렀을 때의 로직을 처리하면 됩니다.
    // 예를 들어, 이메일 주소를 가져와서 서버에 전송하거나 다른 처리를 수행할 수 있습니다.
    // 이 예제에서는 그냥 다이얼로그를 닫기만 하도록 하겠습니다.
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>가동 중지 원인</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="가동중지이유"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
