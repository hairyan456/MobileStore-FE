import { Checkbox, Col, Image, InputNumber, Row } from 'antd';
import React, { useCallback, useEffect } from 'react';
import convertPrice from '../../utils/convertPrice';
import { WrapperQuantityProduct } from '../Product/style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slices/orderSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderItem = ({ order = {}, listChecked = [], setListChecked = () => { }, ...props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (order.amount > order.countInStock)
            setListChecked(prevList => prevList.filter(id => id !== order?.product))
    }, [order?.amount])

    // Handle checkbox change (check/uncheck)
    const handleCheckboxChange = useCallback((prodId, e) => {
        const isChecked = e.target.checked;
        setListChecked(prevList => {
            if (isChecked && !prevList.includes(prodId)) {
                // Thêm prodId nếu chưa tồn tại
                return [...prevList, prodId];
            }
            if (!isChecked && prevList.includes(prodId)) {
                // Loại bỏ prodId nếu đang tồn tại
                return prevList.filter(id => id !== prodId);
            }
            return prevList;
        });
    }, []);

    const handleButtonNumProduct = useCallback((type, prodId) => {
        if (!prodId) return;
        if (type === 'plus')
            dispatch(increaseAmount({ prodId }));
        else if (type === 'minus')
            dispatch(decreaseAmount({ prodId }));
    }, [dispatch]);

    return (
        <Row gutter={20} style={{ alignItems: 'center', background: '#f9f9f9', borderRadius: '8px', padding: '20px' }}>
            <Col span={10} >
                <Checkbox
                    disabled={order.amount > order.countInStock}
                    style={{ marginRight: '8px' }}
                    value={order?.product}
                    checked={listChecked.includes(order?.product)}
                    onChange={(e) => handleCheckboxChange(order?.product, e)}
                />
                <Image
                    src={order?.image ?? ''}
                    style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                    alt="prod_image"
                />
                <div
                    style={{
                        display: 'inline', marginLeft: '8px', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/products/detail/${order?.product ?? ''}`)}
                >
                    {order?.name ?? ''}
                </div>
            </Col>
            <Col span={4} >
                <div>{convertPrice(order?.price) + ' $'}</div>
            </Col>
            <Col span={4} >
                <WrapperQuantityProduct>
                    {!location.pathname.includes('recent') && !location.pathname.includes('order/detail') ?
                        <>
                            <MinusOutlined style={{ color: '#000', fontSize: '12px' }}
                                onClick={() => handleButtonNumProduct('minus', order?.product)} />
                            <InputNumber
                                min={1}
                                value={order?.amount}
                                readOnly={true} />
                            <PlusOutlined style={{ color: '#000', fontSize: '12px' }}
                                onClick={() => handleButtonNumProduct('plus', order?.product)} />
                        </>
                        : <>{order?.amount}</>
                    }
                </WrapperQuantityProduct>
            </Col>
            <Col span={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{convertPrice((+order?.amount * +order?.price)) + ' $' ?? ''}</div>
                {!location.pathname.includes('order/detail') && !location.pathname.includes('recent') &&
                    <DeleteOutlined
                        style={{ fontSize: '18px', cursor: 'pointer', color: 'red' }}
                        onClick={() => { dispatch(removeOrderProduct({ prodId: order?.product ?? '' })) }} />
                }
            </Col>
            {(order?.amount > order?.countInStock) && (
                <div style={{ color: 'red', fontSize: '12.5px', marginTop: '8px' }}>
                    * Số lượng không được vượt quá số lượng tồn kho!
                </div>
            )}
        </Row>
    );
};

export default OrderItem;