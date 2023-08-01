import { useParams } from 'react-router-dom';
import React from 'react';

function LandingPage() {

  const {id} = useParams()

  return (
    <div className="landing">
      <h1>Welcome {id}</h1>
    
    </div>
  )
}

export default LandingPage;