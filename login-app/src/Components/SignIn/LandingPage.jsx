import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { retrieveOperation } from '../api/ApiService';

function LandingPage() {

  const {id} = useParams()
  const [operationtime,setOperationtime] = useState("")

  useEffect(() => {
    
    const intervalTime = setInterval(callTimeApi, 1000) //1초 간격으로 api 호출

    return () => {
      clearInterval(intervalTime) //컴포넌트가 언마운트될 때 메모리 누수 방지
    }
  }, [operationtime])

  function callTimeApi() {
    console.log("called")
    retrieveOperation()
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
      <div className="operation-info">총 가동 시간 : {operationtime}</div>
    
    </div>
  )
}

export default LandingPage;