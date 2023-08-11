import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useMachineCount() {
  const [count, setCount] = useState(0)
  const [targetCount,setTargetCount] = useState('')

  useEffect(() => {
    const intervalTime = setInterval(callCountApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [count]);

  function callCountApi() {
    retrieveData('count')
      .then((response) => {
        console.log("API count 응답 데이터:", response)
        successfulResponse(response) 
        // if (response && response.data && response.data.count !== undefined){
        //     successfulResponse(response) 
        // } else {
        //   errorResponse(new Error("count 0 또는 API 응답 없음"))
        // }
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('count cleanup'));
  }

  function successfulResponse(response) {
    setCount(response);

    // const fetchedCount = response.data.count; // 실제 가져온 count 값
    // setCount(fetchedCount)
  }

  function errorResponse(error) {
    console.log("error occured:",error);
  }

  //목표 생산량 업데이트
  const handleTargetcountChange = (newValue) => {
    setTargetCount(newValue)
  }

  //목표 생산량 전송
  const handleTargetCountSubmit = () => {
    //나중에 서버로 보낼 값
    console.log("목표 생산량:",targetCount)
  }

  const targetAchievement = targetCount
    ? ((count / targetCount) * 100).toFixed(2)
    : ''
  return {count: count, targetCount: targetCount, targetAchievement, handleTargetcountChange: handleTargetcountChange, handleTargetCountSubmit: handleTargetCountSubmit, }
}

export default useMachineCount