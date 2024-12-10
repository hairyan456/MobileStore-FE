import React from 'react';
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ data = [], ...props }) => {
    const navigate = useNavigate();

    const onChangeCheckBox = () => {

    }

    const renderContext = (type, options) => {
        if (options?.length <= 0) return <></>;
        switch (type) {
            case 'text':
                return options.map(item => (
                    <WrapperTextValue key={item} onClick={() => navigate(`/products/type/${item}`)} >
                        {item}
                    </WrapperTextValue>
                ));
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}
                        onChange={onChangeCheckBox}>
                        {options.map(item => (
                            <Checkbox key={item.value} value={item?.value} >
                                {item?.label}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map(item => (
                    <div key={item} style={{ display: 'flex', gap: '15px' }}>
                        <Rate style={{ fontSize: '12px' }} disabled defaultValue={item} />
                        <span>{`Rate from ${item} starts`}</span>
                    </div>
                ));
            case 'price':
                return options.map(item => (
                    <WrapperTextPrice >
                        {item}
                    </WrapperTextPrice>
                ));
            default:
                return {};
        }
    };

    return (
        <div>
            <WrapperLabelText>Product types</WrapperLabelText>
            <WrapperContent>
                {renderContext('text', data)}
            </WrapperContent>
            {/* <WrapperContent>
                {renderContext('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContext('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContext('price', ['Dưới 400.000', 'Trên 100.000'])}
            </WrapperContent> */}
        </div>
    );
};

export default Navbar;