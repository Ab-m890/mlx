import axios from 'axios'

export const axiosInstance = axios.create({
    // baseURL : "https://mlx-olx-aboudimoustafa044-gmailcom.vercel.app/",
    baseURL : "http://localhost:8080/",
    // baseURL : "https://"+window.location.hostname ,
})