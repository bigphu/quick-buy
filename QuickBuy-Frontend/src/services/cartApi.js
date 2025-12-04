import axiosClient from './axiosClient';

const cartApi = {
    getCart: (cartId) => {
        return axiosClient.get(`/cart/${cartId}`);
    },
    addToCart: (data) => {
        return axiosClient.post('/cart/add', data);
    },
    updateCartItem: (data) => {
        return axiosClient.put('/cart/update', data);
    },
    deleteCartItem: (cartItemId) => {
        return axiosClient.delete(`/cart/remove/${cartItemId}`);
    }
};

export default cartApi;