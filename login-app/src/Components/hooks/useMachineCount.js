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
      .then((response) => {
        console.log("API 응답 데이터:", response)
        if (response && response.data && response.data.count !== undefined){
            successfulResponse(response) 
        } else {
          errorResponse(new Error("API 응답 없음"))
        }
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('count cleanup'));
  }

  function successfulResponse(response) {
    const count = response.data.count
    setProduction(count); //production 상태 업데이트
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
