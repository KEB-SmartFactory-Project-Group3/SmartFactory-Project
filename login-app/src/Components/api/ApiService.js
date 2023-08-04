import axios  from 'axios';

const apiClient = axios.create(
  {
    baseURL: 'http://165.246.116.139:8080'
  }
)

// export const retrieveOperation
//      = () => apiClient.get("/api/display/operationtime")

export const retrieveOperation = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return apiClient.get("/api/display/operationtime", config);
};
     

export const retrieveCount = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return apiClient.get("/api/display/count",config)
}
   
     
  
    

