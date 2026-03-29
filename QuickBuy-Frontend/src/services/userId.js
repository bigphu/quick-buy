
import axiosClient from './axiosClient';
console.log('asfsdfdsgdfgdfgfdf');

const userIdAPI = {
    getId: (custId) =>{
        console.log('123');
        return axiosClient.get(`/admin/user/${custId}`)
    },
    getsuperId: (productId) =>{
        console.log('12333');
        return axiosClient.get(`/admin/product/${productId}`)
    }
};


export default userIdAPI;