import { PlusCircleOutlined } from '@ant-design/icons';
import { WrapperButtonAddNew, WrapperHeader } from './style';
import React, { useEffect, useRef, useState } from 'react';
import ProductTable from '../../../modules/Admin/Product/ProductTable';
import ProductAddNew from '../../../modules/Admin/Product/ProductAddNew';

const ManageProductPage = () => {
    const [isModalOpen, setIsShowModal] = useState(false);
    const productTableRef = useRef();

    const handleRefetchProducts = () => {
        productTableRef.current?.refetchProducts();
    };

    useEffect(() => {
        document.title = 'MobileStore - Product management';
    }, []);

    return (
        <div>
            <WrapperHeader>Product Management</WrapperHeader>
            <WrapperButtonAddNew onClick={() => setIsShowModal(true)}>
                <PlusCircleOutlined />
            </WrapperButtonAddNew>
            <ProductTable ref={productTableRef} />
            <ProductAddNew
                isModalOpen={isModalOpen}
                setIsShowModal={setIsShowModal}
                refetchProducts={handleRefetchProducts}
            />
        </div>
    );
};

export default ManageProductPage;
