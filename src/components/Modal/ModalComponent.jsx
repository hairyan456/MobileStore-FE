import { Modal } from 'antd';
import React from 'react';

const ModalComponent = ({ children = <></>, title = '', isModalOpen = false, handleOk = () => { }
    , handleCancel = () => { }, ...props }) => {
    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} {...props}>
            {children}
        </Modal>
    );
};

export default ModalComponent;