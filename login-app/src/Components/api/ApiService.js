import axios  from 'axios';

const apiClient = axios.create(
  {
    baseURL: 'http://165.246.116.192:8080'
  }
)

export const retrieveOperation
     = () => apiClient.get("/api/display/operationtime")

export const retrieveCount
     = () => apiClient.get("/api/display/count")
   
export const exeuteBasicAuthentication
     =(token) => apiClient.post(`/api/auth/login`,{
      name: name,
      headers: {
          Authorization: token
      },
      body:JSON.stringify({name: name}), 
    })
  
    

