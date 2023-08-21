import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useMachineRate() {
  const [nowRate, setNowRate] = useState(0)

  useEffect(() => {
    const intervalTime = setInterval(callRateApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [nowRate]);

  function callRateApi() {
    retrieveData('nowRate')
      .then((response) => {
        console.log("API nowRate 응답 데이터:", response)
        successfulResponse(response) 
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('rate cleanup'));
  }

  function successfulResponse(response) {
    setNowRate(response);

  }

  function errorResponse(error) {
    console.log("error occured:",error);
  }

  return {nowRate: nowRate}
}

export default useMachineRate