import React from 'react';
import { StyleNameCard, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import { StarOutlined } from '@ant-design/icons';
import official_logo from '../../assets/images/official.png'
import { useNavigate } from 'react-router-dom';
import convertPrice from '../../utils/convertPrice';
import soldOutImage from '../../assets/images/sold-out.png'

const CardComponent = ({ name = '', rating = 0, image = '', price = 0, discount = 0, sold = 0, countInStock = 0, ...props }) => {
    const navigate = useNavigate();

    return (
        <>
            <WrapperCardStyle disabled={countInStock === 0} hoverable style={{ width: 200 }}
                cover={<img alt="example" src={countInStock === 0 ? soldOutImage : image} />}
                onClick={() => { countInStock === 0 ? {} : navigate(`/products/detail/${props?.prodId}`) }}
            >
                <WrapperImageStyle src={official_logo} alt='official_logo' />
                <StyleNameCard>{name}</StyleNameCard>
                <WrapperReportText>
                    <span style={{ marginRight: '8px' }}>
                        <span style={{ marginRight: '5px' }}>{rating}</span>
                        <StarOutlined style={{ fontSize: '17px', color: 'aqua' }} />
                    </span>
                    <WrapperStyleTextSell> | {`Sold ${sold}+`}</WrapperStyleTextSell>
                </WrapperReportText>
                <WrapperPriceText>
                    <span style={{ marginRight: '8px' }}> {convertPrice(price) + ' $'} </span>
                    <WrapperDiscountText> {`-${discount * 100}%`} </WrapperDiscountText>
                </WrapperPriceText>
            </WrapperCardStyle>
        </>
    );
};

export default CardComponent;