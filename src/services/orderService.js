import axios from '../setup/axios';

const getAllOrders = () => {
    return axios.get(`/order`);
}

const getOrdersByUserId = (id) => {
    return axios.get(`/order/get-orders-by-userId/${id}`);
}

const getDetailOrder = (orderId, id) => {
    return axios.get(`/order/get-detail-order/${orderId}`, { params: { id } });
}

const postCreateNewOrder = (data) => {
    return axios.post('/order/create', { ...data });
}

const deleteOrder = ({ orderId, id }) => {
    return axios.delete(`/order/delete/${orderId}`, { params: { id } });
}

export {
    getAllOrders, getOrdersByUserId, postCreateNewOrder, getDetailOrder, deleteOrder
};