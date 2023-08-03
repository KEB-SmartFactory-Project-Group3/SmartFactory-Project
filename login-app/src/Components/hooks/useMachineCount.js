import { useEffect, useState } from 'react';
import { retrieveCount } from '../api/ApiService';

function useMachineCount() {
  const [production, setProduction] = useState(0);

  useEffect(() => {
    const intervalTime = setInterval(callCountApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [production]);

  function callCountApi() {
    retrieveCount()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('count cleanup'));
  }

  function successfulResponse(response) {
    setProduction(response.data);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return production;
}

export default useMachineCount;
