import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://165.246.116.128:8080',
  withCredentials: true, //쿠키 자동 포함
});

// export const retrieveOperation 
//       = () => apiClient.get("/api/display/operationtime")

export const retrieveOperation = async () => {
  try {
    const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await apiClient.get("/api/display/operationtime", config);
    return response.data.operationTime
   } catch (error) {
    console.log("API 호출 오류:", error);
    throw error
  }
};

export const retrieveCount = async () => {
  try {
    const token = document.cookie.split('=')[1]; // 쿠키에서 토큰 가져오기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await apiClient.get("/api/display/count", config);
    console.log("count: ",response.data)
    return response.data.production
  } catch (error) {
    console.log("API 호출 오류:", error);
    throw error
  }
};

