import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';
import axios from 'axios';

function useMachineCount() {
  const [count, setCount] = useState(0)
  const [targetCount,setTargetCount] = useState(0)
  const [showAlert, setShowAlert] = useState(false);

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

  const apiServer = axios.create({
    baseURL: 'http://172.20.10.3:8080',
    withCredentials: true, //쿠키 자동 포함
  })

  //목표 생산량 전송
  const handleTargetCountSubmit = async() => {

    // 숫자가 아니거나 빈 문자열일 경우
    if (isNaN(targetCount) || String(targetCount).trim() === '') { 
      // alert("유효한 값을 입력하세요.");
      setShowAlert(true)
      return
    }
    //나중에 서버로 보낼 값
    console.log("목표 생산량:",targetCount)
    try {
      const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        console.log(targetCount)
        const requestRateData = {
          goal : targetCount
        }
        const response = await apiServer.post('/api/display/goal',requestRateData, config)
        if (response.status === 200) {
         console.log('Data posted successfully:', response.data);
         } else {
           console.log('Error while posting data');
         }
       } catch (error) {
         console.error('Error while posting data:', error)
       } 
    }
    
  const targetAchievement = targetCount
    ? ((count / targetCount) * 100).toFixed(2)
    : ''
  return {count : count, setCount: setCount, showAlert, setShowAlert, targetCount: targetCount, targetAchievement, handleTargetcountChange: handleTargetcountChange, handleTargetCountSubmit: handleTargetCountSubmit }
   
}

export default useMachineCount