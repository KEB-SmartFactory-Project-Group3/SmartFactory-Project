import React from 'react';
import useMachine from '../hooks/useMachine';

function MachinePage() {

  const operationTime = useMachine()
  return (
    <div className="MachinePage">
      <h1>기계 장치</h1>
      <div className="operation-info">총 가동 시간 : {operationTime}</div>
    </div>
  )
}

export default MachinePage;