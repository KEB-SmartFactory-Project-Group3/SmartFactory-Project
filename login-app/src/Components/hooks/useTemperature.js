import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';
import axios from 'axios';

function useTemperature() {
  const [temperature,setTemperature] = useState(0);

  useEffect(() => {
    const intervalTime = setInterval(callTempApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [temperature]);

  function callTempApi() {
    retrieveData('temperature')
      .then((response) => {
        console.log("API temp 응답 데이터:", response)
        successfulResponse(response) 
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('temp cleanup'));
  }

  function successfulResponse(response) {
    setTemperature(response);

    // const fetchedtemp = response.data.temperature; // 실제 가져온 temp 값
    // setCount(fetchedtemp)
  }

  function errorResponse(error) {
    console.log("error occured:",error);
  }

 
  return {temperature}
   
}

export default useTemperature