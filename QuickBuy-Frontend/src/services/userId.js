
import axiosClient from './axiosClient';

const userIdAPI = {
    getId: (custId) => {
        return axiosClient.get(`/admin/user/${custId}`)
    },
    getsuperId: (productId) => {
        return axiosClient.get(`/admin/product/${productId}`)
    }
};


export default userIdAPI;