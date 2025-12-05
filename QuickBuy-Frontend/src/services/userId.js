
import axiosClient from './axiosClient';
console.log('asfsdfdsgdfgdfgfdf');

const userIdAPI = {
    getId: (custId) =>{
        console.log('123');
        return axiosClient.get(`/admin/${custId}`)
    }
};


export default userIdAPI;