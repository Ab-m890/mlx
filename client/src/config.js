import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://mlx-olx.herokuapp.com/"
})