import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useTempDB() {

  const [dbTime, setDBTime] = useState([]);
  const [dbTemp, setDBTemp] = useState([]);
  const [dbHum, setDBHum] = useState([]);
  const [dbVaild, setDBVaild] = useState([]);

  useEffect(() => {
    const intervalTime = setInterval(callDBListApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);
  async function callDBListApi() {
    try {
        const DBListData = await retrieveData('TempDBList');
        
        console.log('API Responses DBlist', DBListData);
        
        if (DBListData && Array.isArray(DBListData)) {
            const dbTime = [];
            const dbTemp = [];
            const dbHum = [];
            const dbVaild = [];
            
            DBListData.forEach(item => {
                dbTime.push(item.dbTime);
                dbTemp.push(item.dbTemp);
                dbHum.push(item.dbHum);
                dbVaild.push(item.dbVaild);
            });
            
            setDBTime(dbTime);
            setDBTemp(dbTemp);
            setDBHum(dbHum);
            setDBVaild(dbVaild);
        }
    } catch (error) {
        console.log("Error fetching DBList:", error);
    }
}
  return {
    dbTime,
    dbTemp,
    dbHum,
    dbVaild
  };

}

export default useTempDB;
