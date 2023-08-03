import React from 'react';
import useMachine from '../hooks/useMachine';
import useTimeRecorder from '../hooks/customMachine';

function MachinePage() {

  const { isRunning, elapsedTime, handleStartStop, resetTimer,totalOperationTime } = useTimeRecorder();
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
        <button variant="outlined" sx={{ width: '120px' }} onClick={handleStartStop}>Stop</button>
      ) : (
        <button onClick={handleStartStop}>Start</button>
      )}
      <button variant="outlined" sx={{ width: '120px' }} onClick={resetTimer}>Reset</button>
    </div>
  )
}

export default MachinePage;