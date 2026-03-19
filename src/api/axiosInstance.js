import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://d22nuy89nskkwh.cloudfront.net',
    // baseURL: 'http://localhost:8080',
    timeout: 10000,
    header: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;