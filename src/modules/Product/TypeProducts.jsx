import React from 'react';
import { WrapperTypeProduct } from './style';
import { useNavigate } from 'react-router-dom';

const TypeProducts = ({ name = '' }) => {
    const navigate = useNavigate();

    if (!name) return null;
    return (
        <WrapperTypeProduct onClick={() => navigate(`/products/type/${name}`)}>
            {name}
        </WrapperTypeProduct>
    );
};

export default TypeProducts;