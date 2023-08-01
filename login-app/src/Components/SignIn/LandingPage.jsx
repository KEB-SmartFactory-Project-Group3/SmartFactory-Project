import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios  from 'axios';

function LandingPage() {

  const {id} = useParams()
  const {operationtime,setOperationtime} = useState(null)

  function callTimeApi() {
    console.log("called")
    axios.get("http://172.20.10.3:8080/api/time/operationtime")
          .then (
            (response) => successfulResponse(response)
          )
          .catch ( (error) => errorResponse(error))
          .finally ( () => console.log("cleanup"))
    
  }
  function successfulResponse(response) {
    console.log(response)
    setOperationtime(response.data)
  }

  function errorResponse(error) {
    console.log(error)
  }

  return (
    <div className="landing">
      <h1>Welcome {id}</h1>
      <div>
        <button className="btn-time" onClick={callTimeApi}>Time API</button>
      </div>
      <div className="operation-info">{operationtime}</div>
    
    </div>
  )
}

export default LandingPage;