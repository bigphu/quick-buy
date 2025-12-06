import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // URL Backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
