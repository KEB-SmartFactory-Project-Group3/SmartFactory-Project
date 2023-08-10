import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://165.246.116.143:8080',
  withCredentials: true, //쿠키 자동 포함
});


export const retrieveData = async (dataKey) => {
  try {
    const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await apiClient.get("/api/display/machineinfo", config);
    // console.log(response.data.operationStartTime)

    if (dataKey === 'operationStartTime') {
      return response.data.operationStartTime
    } else if (dataKey === 'count') {
      return response.data.count
    } else if (dataKey === 'temperature') {
      return response.data.temperature
    } 
    return null 
   } catch (error) {
    console.log("API 호출 오류:", error)
    throw error
  }
};



