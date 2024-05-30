import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
axiosClient.interceptors.response.use((res) => {
  return res;
},(error)=>{
  const {response} = error;
  if (response.status === 401){
    localStorage.removeItem('ACCESS_TOKEN')
  }
  throw error;
  
});
