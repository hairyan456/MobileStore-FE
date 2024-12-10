import React from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const DefaultLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flexGrow: 1, display: 'flex', height: '100%' }}>
                <Outlet />
            </div>
            <Footer />
        </div >
    );
};

export default DefaultLayout;