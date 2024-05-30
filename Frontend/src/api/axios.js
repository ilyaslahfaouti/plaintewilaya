import axios from 'axios'



export const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
})