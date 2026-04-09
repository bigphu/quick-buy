
import axiosClient from './axiosClient';

const userIdAPI = {
    getId: (custId) => {
        return axiosClient.get(`/admin/user/${custId}`)
    },
    getsuperId: (productId) => {
        return axiosClient.get(`/admin/product/${productId}`)
    },
    reorderFromHistory: (clientId, orderId) => {
        return axiosClient.post(`/client/${clientId}/order-history/${orderId}/reorder`)
    },
};


export default userIdAPI;