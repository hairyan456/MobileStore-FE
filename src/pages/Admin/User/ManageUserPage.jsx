import {  WrapperHeader } from './style';
import React, { useEffect, useRef } from 'react';
import UserTable from '../../../modules/Admin/User/UserTable';

const ManageUserPage = () => {
    const userTableRef = useRef();

    const handleRefetchProducts = () => {
        userTableRef.current?.refetchProducts();
    };

    useEffect(() => {
        document.title = 'MobileStore - Users management';
    }, []);

    return (
        <div>
            <WrapperHeader>User Management</WrapperHeader>
            <UserTable ref={userTableRef} />
        </div>
    );
};

export default ManageUserPage;
