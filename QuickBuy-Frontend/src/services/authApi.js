import axiosClient from './axiosClient';

const authApi = {
    login: (data) => axiosClient.post('/auth/login', data),
};

export default authApi;
