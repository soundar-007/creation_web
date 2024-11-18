import axios from "axios";

const API = axios.create({
  baseURL: "https://creation-web.onrender.com",
  // baseURL: "http://localhost:3001",
  withCredentials: true,
});


// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     console.log(token,'incterce')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } 
//     console.log(config)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default API;