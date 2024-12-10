import React from 'react';
import { AppstoreOutlined, UserOutlined, ProductOutlined, HomeOutlined, DashboardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
    {
        key: 'main_menu',
        label: 'Management',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'dashboard',
                label: 'Dashboard',
                icon: <DashboardOutlined />
            },
            {
                type: 'divider',
            },
            {
                key: 'menu_user',
                label: 'Users',
                icon: <UserOutlined />,
                children: [
                    {
                        key: 'users',
                        label: 'Manage Users',
                    },
                ],
            },
            {
                type: 'divider',
            },
            {
                key: 'menu_product',
                label: 'Products',
                icon: <ProductOutlined />,
                children: [
                    {
                        key: 'products',
                        label: 'Manage Products',
                    },
                ],
            },
            {
                key: 'menu_order',
                label: 'Orders',
                icon: <ShoppingCartOutlined />,
                children: [
                    {
                        key: 'orders',
                        label: 'Manage Orders',
                    },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'home',
        icon: <HomeOutlined style={{ fontSize: '30px', marginLeft: '80px', color: 'grey' }} />,
    },

];

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = (e) => {
        if (e?.key === 'home')
            navigate('/');
        else if (e?.key === 'dashboard')
            navigate('/system/admin')
        else navigate(`/system/admin/${e?.key}`)
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256, height: '100vh', boxShadow: '1px 1px 2px #ccc'
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['main_menu']}
            mode="inline"
            items={items}
        />
    );
};
export default AdminSidebar;