import { Drawer } from 'antd';
import React from 'react';

const DrawerComponent = ({ children = <></>, title = '', placement = 'right', isOpen = false, ...rest }) => {
    return (
        <Drawer title={title} placement={placement} open={isOpen} {...rest}>
            {children}
        </Drawer>
    );
};

export default DrawerComponent;