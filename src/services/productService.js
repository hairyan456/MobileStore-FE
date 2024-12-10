import axios from '../setup/axios';

const getAllProducts = () => {
    return axios.get('/product');
}

const getProductsByCondition = (page, limit, sort, filter, field) => {
    return axios.get(`/product?page=${page}&limit=${limit}&sort=${sort}&filter=${filter}&field=${field}`);
}

const getDetailProduct = (id) => {
    return axios.get(`/product/${id}`);
}

const postAddNewProduct = (data) => {
    return axios.post('/product/create', { ...data });
}

const putUpdateProduct = (data) => {
    return axios.put(`/product/update`, { ...data })
};

const deleteProduct = (prodId) => {
    return axios.delete(`/product/delete`, { data: { id: prodId } })
};

const deleteManyProducts = (arrIds) => {
    return axios.delete(`/product/delete-many`, { data: { ids: arrIds } });
};

const getAllProductTypes = () => {
    return axios.get('/product/get-all-types');
}

const getProductsByType = (page, limit, filter, type) => {
    if (page && limit)
        return axios.get(`/product/get-products-by-type/${type}?page=${page}&limit=${limit}&filter=${filter}`);
    return axios.get(`/product/get-products-by-type/${type}`);
}

export {
    getAllProducts, getProductsByCondition, getDetailProduct, postAddNewProduct, putUpdateProduct,
    deleteProduct, deleteManyProducts, getAllProductTypes, getProductsByType
};