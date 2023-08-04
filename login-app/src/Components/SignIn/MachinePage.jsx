import React, { useEffect, useState } from 'react';
import useMachine from '../hooks/useMachine';
import useTimeRecorder from '../hooks/customMachine';
import useMachineCount from '../hooks/useMachineCount';
import Button from '@mui/material/Button';
import FormDialog from './FormDialog';

function MachinePage() {

  const { isRunning, elapsedTime, handleStart, handleStop, resetTimer} = useTimeRecorder();
  const operationTime = useMachine()
  const {production, targetAchievement, targetProduction, handleTargetProductionChange} = useMachineCount()

  const [formOpen, setFormOpen] = useState(false)

  const handleOpenForm = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  };

  const formatTime = (time) => {
    // 시간을 분:초 형식으로 포맷팅하는 함수
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="MachinePage">
      {isRunning ? (
        <Button
          variant="contained"
          style={{ backgroundColor: '#5C6AC4', color: 'white' }}
          sx={{ width: '20px' }}
          size="small"
          onClick={handleStop}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ backgroundColor: '#5C6AC4', color: 'white' }}
          sx={{ width: '20px' }}
          size="small"
          onClick={() => {
            handleStart();
            handleOpenForm();
          }}
        >
          Start
        </Button>
      )}
      <FormDialog open={formOpen} handleClose={handleCloseForm} />
      <h1>기계 장치</h1>
      <div className="targetAchievement-info">도달량 : {targetAchievement}</div>
      <div className="targetProduction-info">목표 생산량 : {targetProduction}</div>
      <div className="operation-info">총 가동 시간 : {operationTime}</div>
      <div className="production-info">생산량 : {production}</div> 
      <p>가동중지: {formatTime(elapsedTime)}</p>
      <Button
        variant="contained"
        style={{ backgroundColor: '#5C6AC4', color: 'white' }}
        sx={{ width: '20px' }}
        size="small"
        onClick={resetTimer}
      >
        Reset
      </Button>
    </div>
  );
}



export default MachinePage;