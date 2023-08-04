// hooks/useOperationTime.js
import { useEffect, useState } from 'react';
import { retrieveOperation } from '../api/ApiService';

function useMachine() {
  const [operationTime, setOperationTime] = useState('');

  useEffect(() => {
    const intervalTime = setInterval(callTimeApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [operationTime]);

  function callTimeApi() {
    retrieveOperation()
      .then((response) => {
        console.log("API 응답 데이터:", response)
        successfulResponse(response)})
      .catch((error) => errorResponse(error))
      .finally(() => console.log('cleanup'));
  }

  function successfulResponse(response) {
    setOperationTime(response.data);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return operationTime;
}

export default useMachine;
