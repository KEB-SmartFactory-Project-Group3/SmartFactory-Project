import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';
import axios from 'axios';

function useTemperature() {

  const [factoryTemperature,setFactoryTemperature] = useState(0)
  const [factoryHumidity, setFactoryHumidity] = useState(0)

  useEffect(() => {
    const intervalTime = setInterval(callTempAndHumApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [factoryTemperature, factoryHumidity]);

  function callTempAndHumApi() {
    retrieveData('factoryTemperature')
      .then((response) => {
        console.log("API temp 응답 데이터:", response)
        successfulResponse(response) 
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('temp cleanup'))

    retrieveData('factoryHumidity')
    .then((response) => {
      console.log("API humidity 응답 데이터:", response)
      setFactoryHumidity(response);
    })
    .catch((error) => errorResponse(error))
    .finally(() => console.log('humidity cleanup'))
  }

  function successfulResponse(response) {
    setFactoryTemperature(response);
  }

  function errorResponse(error) {
    console.log("error occured:",error);
  }

 
  return {factoryTemperature,  factoryHumidity }
   
}

export default useTemperature