import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function FormDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>가동 중지 원인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          가동 중지하는 이유를 작성해주세요
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="가동 중지 원인"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleClose}>Subscribe</button>
      </DialogActions>
    </Dialog>
  );
}
