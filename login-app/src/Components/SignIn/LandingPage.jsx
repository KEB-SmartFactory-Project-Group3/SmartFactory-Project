import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios  from 'axios';

function LandingPage() {

  const {id} = useParams()
  const [operationtime,setOperationtime] = useState("")

  function callTimeApi() {
    console.log("called")
    axios.get("http://165.246.116.26:8080/api/display/operationtime")
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