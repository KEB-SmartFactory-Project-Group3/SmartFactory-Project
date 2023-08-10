import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useMachineCount() {
  const [count, setCount] = useState(0);
  const [targetCount,setTargetCount] = useState(0)

  useEffect(() => {
    const intervalTime = setInterval(callCountApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [count]);

  function callCountApi() {
    retrieveData('count')
      .then((response) => {
        // console.log("API count 응답 데이터:", response)
        if (response !== undefined){
            successfulResponse(response) 
        } else {
          errorResponse(new Error("count 0 또는 API 응답 없음"))
        }
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('count cleanup'));
  }

  function successfulResponse(response) {
    const count = response.data.count
    setCount(count) //production 상태 업데이트
    setTargetCount(response.data.targetCount)
  }

  function errorResponse(error) {
    console.log(error);
  }

  function handleTargetcountChange(e) {
    setTargetCount(e.target.value)
  }

  const targetAchievement = targetCount
    ? ((count / targetCount) * 100).toFixed(2)
    : ''
  return {count: count, targetCount: targetCount, targetAchievement, handleTargetcountChange}
}

export default useMachineCount;
