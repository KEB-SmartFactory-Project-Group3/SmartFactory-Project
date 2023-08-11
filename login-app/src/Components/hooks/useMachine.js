// hooks/useOperationTime.js
import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useMachine() {
  const [operationStartTime, setOperationTime] = useState('')

  useEffect(() => {
    const intervalTime = setInterval(callTimeApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [operationStartTime]);

  function callTimeApi() {
    retrieveData('operationStartTime')
      .then((response) => {
        console.log("API oper 응답 데이터:", response)
        successfulResponse(response)})
      .catch((error) => errorResponse(error))
      .finally(() => console.log('cleanup'));
  }

  function successfulResponse(response) {
    // setOperationTime(response.data);
    setOperationTime(response)
  }

  function errorResponse(error) {
    console.log(error);
  }

  useEffect(() => {
    const intervalTime = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  function updateTime() {
    const currentTime = new Date();
    setOperationTime(currentTime);
  }

  return operationStartTime;
}

// 시간 변환 (타이머 처리)
function formatOperationTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export {useMachine,formatOperationTime}
