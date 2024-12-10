import axios from '../setup/axios';

const getPaymentConfig = () => {
    return axios.get(`/payment/config`);
}


export { getPaymentConfig, };