import { Steps } from 'antd';
import React from 'react';

const StepComponent = ({ current = -1, items = [] }) => {
    return (
        <Steps
            current={current}
            items={items}
        />
    );
};

export default StepComponent;