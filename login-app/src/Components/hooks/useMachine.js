// hooks/useOperationTime.js
import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useMachine() {
  const [operationStartTime, setOperationTime] = useState('');

  useEffect(() => {
    const intervalTime = setInterval(callTimeApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [operationStartTime]);

  function callTimeApi() {
    retrieveData('operationStartTime')
      .then((response) => {
        // console.log("API oper 응답 데이터:", response)
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

  return operationStartTime;
}

export default useMachine;
