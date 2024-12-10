import React from 'react';
import AdminSidebar from '../modules/Admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

const WrapperLayoutAdmin = styled.div`
    width: 100%;
    display: flex;
    box-sizing: border-box;
`;

const WrapperAdminContent = styled.div`
    flex: 1;
    box-sizing: border-box;
    height: 100vh;
    padding: 20px;
`;
const LayoutAdmin = () => {

    return (
        <WrapperLayoutAdmin>
            <AdminSidebar />
            <WrapperAdminContent>
                <PerfectScrollbar>
                    <Outlet />
                </PerfectScrollbar>
            </WrapperAdminContent>
        </WrapperLayoutAdmin>
    );
};
export default LayoutAdmin;