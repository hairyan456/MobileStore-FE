import { Spin } from 'antd';
import React from 'react';

const Loading = ({ children = <></>, isLoading = false, delay = 0, ...props }) => {
    return (
        <Spin spinning={isLoading} delay={delay} {...props} >
            {children}
        </Spin>
    );
};

export default Loading;