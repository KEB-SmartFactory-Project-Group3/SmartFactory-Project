import React from 'react';
import useTimeRecorder from '../hooks/customMachine';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function FormDialog() {
  const { isRunning, elapsedTime, handleStart, handleStop, resetTimer } = useTimeRecorder()

  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    handleStart(); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}> 
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>가동 중지 원인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            가동 중지 원인을 작성해주세요
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
