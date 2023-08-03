import axios  from 'axios';

const apiClient = axios.create(
  {
    baseURL: 'http://165.246.116.192:8080'
  }
)

export const retrieveOperation
     = () => apiClient.get("/api/display/operationtime")
