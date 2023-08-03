import React from 'react';
import useMachine from '../hooks/useMachine';
import useTimeRecorder from '../hooks/customMachine';
import Button from '@mui/material/Button';

function MachinePage() {

  const { isRunning, elapsedTime, handleStartStop, resetTimer } = useTimeRecorder();
  const operationTime = useMachine()

  const formatTime = (time) => {
    // 시간을 분:초 형식으로 포맷팅하는 함수
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

 

  return (
    <div className="MachinePage">
      <h1>기계 장치</h1>
      <div className="operation-info">총 가동 시간 : {operationTime}</div>
      <p>가동중지: {formatTime(elapsedTime)}</p>
      {isRunning ? (
        <Button variant="contained" style={{ backgroundColor: '#5C6AC4', color: 'white' }} 
            sx={{ width: '20px' }} size='small' onClick={handleStartStop}>Stop</Button>
      ) : (
        <Button variant="contained" style={{ backgroundColor: '#5C6AC4', color: 'white' }} 
            sx={{ width: '20px' }} size='small' onClick={handleStartStop}>Start</Button>
      )}
        <Button variant="contained" style={{ backgroundColor: '#5C6AC4', color: 'white' }}
              sx={{ width: '20px' }} size='small' onClick={resetTimer}>Reset</Button>
    </div>
  )
}


export default MachinePage;