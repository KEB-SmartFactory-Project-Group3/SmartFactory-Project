import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';
import axios from 'axios';

function useDefective() {

  const [defectiveCount,setDefectiveCount] = useState(0)

  useEffect(() => {
    const intervalTime = setInterval(callDefectApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [defectiveCount]);

  function callDefectApi() {
    retrieveData('defectiveCount')
      .then((response) => {
        console.log("API defect 응답 데이터:", response)
        successfulResponse(response) 
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log('defect cleanup'))
  }

  function successfulResponse(response) {
    setDefectiveCount(response);
  }

  function errorResponse(error) {
    console.log("defect error occured:",error);
  }
 
  return {defectiveCount}
   
}

export default useDefective