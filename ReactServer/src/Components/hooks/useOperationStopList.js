import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useOperationStopList() {

  const [stopTime, setStopTime] = useState([]);
  const [opTime, setOpTime] = useState([]);
  const [user, setUser] = useState([]);
  const [stopReason, setStopReason] = useState([]);
  const [rate, setRate] = useState([]);

  useEffect(() => {
    const intervalTime = setInterval(callStopListApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);
  async function callStopListApi() {
    try {
        const stopListData = await retrieveData('operationStopList');
        
        console.log('API Responses stoplist', stopListData);
        
        if (stopListData && Array.isArray(stopListData)) {
            const stopTimes = [];
            const opTimes = [];
            const users = [];
            const stopReasons = [];
            const rates = [];
            
            stopListData.forEach(item => {
                stopTimes.push(item.stopTime);
                opTimes.push(item.opTime);
                users.push(item.user);
                stopReasons.push(item.stopReason);
                rates.push(item.rate);
            });
            
            setStopTime(stopTimes);
            setOpTime(opTimes);
            setUser(users);
            setStopReason(stopReasons);
            setRate(rates);
        }
    } catch (error) {
        console.log("Error fetching operationStopList:", error);
    }
}
  return {
    stopTime,
    opTime,
    user,
    stopReason,
    rate,
  };

}

export default useOperationStopList;
