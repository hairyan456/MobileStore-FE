import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProductPage = () => {
    const params = useLocation();

    if (params.pathname.includes('/detail') || params.pathname.includes('/type'))
        return <Outlet />;
    return (
        <Navigate to={'/'} />
    );
};

export default ProductPage;