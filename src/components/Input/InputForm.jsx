import React, { useState } from 'react';
import { WrapperStyleInputForm } from './style';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const InputForm = ({ size = 'medium', placeholder = '', style = '', type = 'text', value = '', setValue = () => { }, ...props }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setIsShowPassword(isShow => !isShow);
    };

    if (type === 'password')
        return (
            <div style={{ display: 'flex', position: 'relative' }}>
                <WrapperStyleInputForm type={`${isShowPassword ? 'text' : type}`} size={size} style={style} placeholder={placeholder}
                    value={value}
                    onChange={setValue}
                    {...props}
                />
                {isShowPassword ?
                    <EyeOutlined style={{ position: 'absolute', top: 5, right: 5, color: 'gray' }} onClick={handleTogglePassword} />
                    :
                    <EyeInvisibleOutlined style={{ position: 'absolute', top: 5, right: 5, color: 'gray' }} onClick={handleTogglePassword} />
                }
            </div >
        );

    return (
        <WrapperStyleInputForm type={type} size={size} style={style} placeholder={placeholder} value={value}
            onChange={setValue}  {...props}
        />
    );
};

export default InputForm;