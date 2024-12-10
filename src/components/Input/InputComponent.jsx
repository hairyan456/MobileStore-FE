import React from 'react';
import { Input } from 'antd'

const InputComponent = ({ size = 'medium', placeholder = '', style = '', bordered = false, ...rest }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            style={style}
            bordered={{ bordered }}
            {...rest}
        />
    );
};

export default InputComponent;