import React from 'react';
import { WrapperButtonComponent } from './style';

const ButtonComponent = ({ type = 'button', disabled = false, style = {}, text = '', ...rest }) => {
    return (
        <WrapperButtonComponent disabled={disabled}
            style={{
                background: disabled ? '#ddd' : 'rgb(255,57,69)',
                ...style
            }}
            htmlType={type}
            {...rest}
        >
            {text}
        </WrapperButtonComponent>
    );
};

export default ButtonComponent;