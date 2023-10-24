import  axios  from "axios";

const token = localStorage.getItem('token');
export const makeRequest = axios.create({
    baseURL:"https://social-server-evtu.onrender.com/api",
    headers: {
        Authorization: `Bearer ${token}`,
      }
})