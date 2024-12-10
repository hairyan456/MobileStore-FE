import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const OrderPage = () => {
    const params = useLocation();
    if (params.pathname.includes('history') || params.pathname.includes('recent') || params.pathname.includes('detail'))
        return <Outlet />;

    return (
        <Navigate to={'/'} />
    );
};

export default OrderPage;