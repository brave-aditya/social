import  axios  from "axios";

const token = localStorage.getItem('token');
export const makeRequest = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: `Bearer ${token}`,
      }
})