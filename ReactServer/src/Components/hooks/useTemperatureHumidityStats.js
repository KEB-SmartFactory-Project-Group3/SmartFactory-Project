import { useEffect, useState } from 'react';
import { retrieveData } from '../api/ApiService';

function useTemperatureHumidityStats() {

  const [maxTemperature, setMaxTemperature] = useState(0);
  const [minTemperature, setMinTemperature] = useState(0);
  const [maxHumidity, setMaxHumidity] = useState(0);
  const [minHumidity, setMinHumidity] = useState(0);
  const [avgTemperature, setAvgTemperature] = useState(0);
  const [avgHumidity, setAvgHumidity] = useState(0);

  useEffect(() => {
    const intervalTime = setInterval(callStatsApi, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  async function callStatsApi() {
    const statsKeys = [
      'maxTemperature', 
      'minTemperature', 
      'maxHumidity', 
      'minHumidity', 
      'avgTemperature', 
      'avgHumidity'
    ];

    const results = await Promise.allSettled(statsKeys.map(key => retrieveData(key)));

    console.log('API Responses stats:', results); 
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        switch (statsKeys[index]) {
          case 'maxTemperature':
            setMaxTemperature(result.value);
            break;
          case 'minTemperature':
            setMinTemperature(result.value);
            break;
          case 'maxHumidity':
            setMaxHumidity(result.value);
            break;
          case 'minHumidity':
            setMinHumidity(result.value);
            break;
          case 'avgTemperature':
            setAvgTemperature(result.value);
            break;
          case 'avgHumidity':
            setAvgHumidity(result.value);
            break;
          default:
            break;

        }
      } else {
        console.log(`Error fetching ${statsKeys[index]}:`, result.reason);
      }
    });
  }

  return {
    maxTemperature, 
    minTemperature, 
    maxHumidity, 
    minHumidity, 
    avgTemperature, 
    avgHumidity
  };
}

export default useTemperatureHumidityStats;





  
