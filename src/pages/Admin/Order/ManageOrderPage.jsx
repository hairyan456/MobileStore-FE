import { WrapperHeader } from './style';
import React, { useEffect } from 'react';
import OrderTable from '../../../modules/Admin/Order/OrderTable';

const ManageOrderPage = () => {


    useEffect(() => {
        document.title = 'MobileStore - Order Management';
    }, []);

    return (
        <div>
            <WrapperHeader>Order Management</WrapperHeader>
            <OrderTable />
        </div>
    );
};

export default ManageOrderPage;
