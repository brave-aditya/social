import  axios  from "axios";

export const makeRequest = axios.create({
    baseURL:"https://social-server-evtu.onrender.com/api",
    withCredentials: true,
})