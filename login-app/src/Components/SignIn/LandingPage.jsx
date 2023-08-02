import { useParams } from 'react-router-dom';
import React from 'react';
import useMachine from '../hooks/useMachine';

function LandingPage() {

  const {id} = useParams()
  const operationtime = useMachine()

  return (
    <div className="landing">
      <h1>Welcome {id}</h1>
      <div className="operation-info">총 가동 시간 : {operationtime}</div>
    
    </div>
  )
}

export default LandingPage;