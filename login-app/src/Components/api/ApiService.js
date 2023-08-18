import axios from 'axios';

export const apiServer = axios.create({
    baseURL: 'http://192.168.43.183:8080',
    withCredentials: true, //쿠키 자동 포함
  })

export const apiClient = axios.create({
  baseURL: 'http://192.168.43.183:8080',
  withCredentials: true, //쿠키 자동 포함
});

// 가동 시작 백엔드 api로 전송
export const sendStartToBackend = async (StartData) => {
  const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
      const response = await apiClient.post('/click/button', StartData, config);
      if (response.status === 200) {
          console.log("startState posted successfully", response.data);
          return response.data;
      } else {
          console.log("startState Error while posting");
          throw new Error('startState Error while posting');
      }
  } catch (error) {
      console.error("Error sending start command", error);
      throw error;
  }
};

//  reset 백엔드 api 전송
export const sendResetToBackend = async (ResetData) => {
  const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
try {
    const response = await apiClient.post('/click/button', ResetData, config) 
    if (response.status === 200) {
      console.log("resetState posted successfully", response.data)
      return response.data
    } else {
      console.log("resetState Error while posting")
    }
  }catch (error) {
    console.error("Error sending reset command", error);
  }

}

// 백엔드 api 호출 
export const retrieveData = async (dataKey) => {
  try {
    const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let response;

    if (dataKey === 'factoryTemperature' || dataKey === 'times' || dataKey === 'factoryHumidity') {
      response = await apiClient.get("/api/display/factoryinfo", config);
      return response.data[dataKey];  // dataKey에 대한 값 직접 반환
    } 
    // else if (dataKey === 'maxTemperature' || dataKey === 'minTemperature' || dataKey === 'avgTemperature' || dataKey === 'maxHumidity' || dataKey === 'minHumidity' || dataKey === 'avgHumidity') {
    //   response = await apiClient.get("/api/display/statistics", config);
    //   return response.data[dataKey];
    // } 
    
      else if (dataKey === 'operationStopList') {
      response = await apiClient.get("/operationstop/totallist", config);
      const modifiedData = response.data.map(item => ({
          stopTime: item.operationStopTime,
          opTime: item.operationTime,
          user: item.userName,
          stopReason: item.reason, 
          rate: item.nowRate
      }));
      return modifiedData;
    }
      else {
        response = await apiClient.get("/api/display/machineinfo", config);
        if (dataKey === 'count') {
          return response.data.count
        } else if (dataKey ==='nowRate') {
          return response.data.nowRate
        } else if (dataKey === 'defectiveCount') {
          return response.data.defectiveCount
        }
      }
      return null 
    } catch (error) {
      console.log("API 호출 오류:", error)
      throw error
    }
};



