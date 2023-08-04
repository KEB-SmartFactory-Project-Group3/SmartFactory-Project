import { useEffect, useState } from 'react';
import { retrieveCount } from '../api/ApiService';

function useMachineCount() {
  const [production, setProduction] = useState(0);
  const [targetProduction,setTargetProduction] = useState(0)

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

  function handleTargetproductionChange(e) {
    setTargetProduction(e.target.value)
  }

  const targetAchievement = targetProduction
    ? ((production / targetProduction) * 100).toFixed(2)
    : ''
  return {production, targetProduction, targetAchievement, handleTargetproductionChange}
}

export default useMachineCount;
