import { Container, LeftSection, RightSection, SummaryItem, WrapperSteps } from './style';
import { saveListChecked } from '../../redux/slices/orderSlice';
import { Row, Col, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import convertPrice from '../../utils/convertPrice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useOrderCalculations from '../../hooks/useOrderCalculate';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import OrderItem from '../../modules/Order/OrderItem';
import StepComponent from '../../components/Step/StepComponent';

const items = [
    {
        title: '< 5.000$',
        description: 'Sub Total',
    },
    {
        title: '< 15.000$',
        description: 'Sub Total',
    },
    {
        title: '< 20.0000$',
        description: 'Sub Total',
    },
];

const CartPage = () => {
    const navigate = useNavigate(), dispatch = useDispatch(), location = useLocation();
    const { orderItems, listCheckedStore } = useSelector(state => state.order);
    const user = useSelector(state => state.user.info);
    const [listChecked, setListChecked] = useState(listCheckedStore);
    const [showPopupPayment, setShowPopupPayment] = useState(false);
    const [current, setCurrent] = useState(-1);
    const listCheckedRef = useRef(listChecked);  // Dùng ref để lưu trữ giá trị mới nhất của listChecked

    useEffect(() => {
        listCheckedRef.current = listChecked; // Cập nhật ref khi listChecked thay đổi
        if (subtotal <= 0)
            setCurrent(-1);
        else if (subtotal < 5000)
            setCurrent(0)
        else if (subtotal < 15000)
            setCurrent(1);
        else
            setCurrent(2)
    }, [listChecked]);

    useEffect(() => {
        document.title = 'Carts page';
        return () => {
            dispatch(saveListChecked({ listChecked: listCheckedRef.current }));
            setShowPopupPayment(false);
        };
    }, []);

    // hàm kiểm tra prodId trong listChecked có còn tồn tại trong orderItems k
    const validateListChecked = useCallback(() => {
        setListChecked(prevList => {
            // Lọc các prodId không tồn tại trong orderItems
            const validIds = prevList.filter(prodId => orderItems.some(item => item.product === prodId));
            return validIds;
        });
    }, [orderItems]);

    useEffect(() => {
        validateListChecked();
    }, [orderItems, validateListChecked]);

    const { subtotal, discountTotal, tax, total } = useOrderCalculations(orderItems, listChecked);

    const handlePayment = () => {
        if (!user?.address || !user?.phone || !user?.name || !user?.city)
            setShowPopupPayment(true);
        else
            navigate('/payment')
    }

    return (
        <Container>
            <Row style={{ gap: '15px' }} >
                {/* Left Section */}
                <LeftSection span={15}>
                    <WrapperSteps>
                        <StepComponent items={items} current={current} />
                    </WrapperSteps>
                    <Row gutter={20}
                        style={{ background: '#f9f9f9', borderRadius: '8px', padding: '20px', fontWeight: '550', marginBottom: '10px' }}>
                        <Col span={10}>
                            <div>Tất cả ({`${orderItems?.length}`} sản phẩm)</div>
                        </Col>
                        <Col span={4}>
                            <div>Đơn giá</div>
                        </Col>
                        <Col span={4}>
                            <div>Số lượng</div>
                        </Col>
                        <Col span={6}>
                            <div>Thành tiền</div>
                        </Col>
                    </Row>
                    {orderItems?.length > 0 &&
                        orderItems.map(item => (
                            <OrderItem
                                key={item?.product}
                                order={item}
                                listChecked={listChecked}
                                setListChecked={setListChecked} />
                        ))
                    }
                </LeftSection>

                {/* Right Section */}
                <RightSection span={8}>
                    <SummaryItem>
                        <span>Tạm tính:</span>
                        <span>{convertPrice(subtotal) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Giảm giá:</span>
                        <span>{convertPrice(discountTotal) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Thuế VAT (8%):</span>
                        <span>{convertPrice(tax) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Tổng tiền:</span>
                        <span style={{ color: 'rgb(255, 57, 69)', fontWeight: '550', fontSize: '30px' }}>
                            {convertPrice(total) + ' $'}
                        </span>
                    </SummaryItem>
                    <SummaryItem style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', right: '0' }}>(Đã bao gồm thuế VAT nếu có)</span>
                    </SummaryItem>
                    {listChecked?.length <= 0 || orderItems?.length <= 0 ? <div style={{ display: 'block' }} />
                        :

                        <Loading isLoading={false} >
                            <Button type="primary" block
                                style={{ marginTop: '50px', padding: '20px 0', background: 'rgb(255, 57, 69)', fontSize: '20px' }}
                                onClick={() => handlePayment()}
                            >
                                Mua hàng
                            </Button>
                        </Loading>
                    }
                    <Modal title="Missing some information"
                        open={showPopupPayment}
                        onOk={() => navigate('/user-profile', { state: location.pathname })}
                        onCancel={() => setShowPopupPayment(false)}
                    >
                        <p style={{ fontSize: '15px' }}>Looks like you're missing some important personal information that we can deliver to you.</p>
                        <p style={{ fontSize: '15px' }}>Press 'OK' to update profile</p>
                    </Modal>
                </RightSection>
            </Row >
        </Container >
    );
};

export default CartPage;
