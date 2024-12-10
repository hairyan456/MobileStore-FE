import { Container, LeftSection, RightSection, SummaryItem } from './style';
import { Row, Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import convertPrice from '../../utils/convertPrice';
import React, { useEffect, useState } from 'react';
import useOrderCalculations from '../../hooks/useOrderCalculate';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { PayCircleOutlined, CarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { postCreateNewOrder } from '../../services/orderService';
import { resetOrderCarts } from '../../redux/slices/orderSlice';
import { PayPalButton } from "react-paypal-button-v2";
import { getPaymentConfig } from '../../services/paymentService';

const PaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.info);
    const { orderItems, listCheckedStore } = useSelector(state => state.order);
    const [valueDelivery, setValueDelivery] = useState(''), [valuePayment, setValuePayment] = useState('');
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        // add Paypal script
        const addPaypalScript = async () => {
            try {
                const res = await getPaymentConfig();
                if (res?.EC === 0) {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${res?.DT}`;
                    script.async = true;
                    script.onload = () => setSdkReady(true);
                    document.body.appendChild(script);
                }
            } catch (error) {
                console.log('Error while get payment config', error);
                toast.error(error?.message);
            }
        };

        document.title = 'Payment page';
        if (!window.paypal)
            addPaypalScript();
        else setSdkReady(true);
    }, []);

    const calculateFeeShip = () => {
        if (!valueDelivery) return 0;
        return (valueDelivery === 'save_delivery') ? 15 : 20;
    }
    const { subtotal, discountTotal, tax, total, selectedItems } = useOrderCalculations(orderItems, listCheckedStore, calculateFeeShip());

    const mutation = useMutation({
        mutationFn: postCreateNewOrder,
        onSuccess: async (res, variables) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Create new order success');
                dispatch(resetOrderCarts({}));
                navigate('/order/recent', { state: { ...variables, orderItems: res?.DT, discountTotal, tax, listChecked: listCheckedStore } });
            } else
                toast.error(res?.EM ?? 'Create order failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleOrder = async () => {
        if (!valueDelivery) {
            toast.warning('You have not selected a delivery method!');
            return;
        }
        if (!valuePayment) {
            toast.warning('You have not selected a payment method!');
            return;
        }
        let data = {
            orderItems: selectedItems,
            email: user?.email,
            fullName: user?.name,
            address: user?.address,
            city: user?.city,
            phone: user?.phone,
            paymentMethod: valuePayment,
            itemsPrice: subtotal,
            shippingPrice: calculateFeeShip(),
            totalPrice: total,
            user: user?._id,
        };
        await mutation.mutateAsync({ id: user?._id, ...data });
        mutation.reset();
    }

    return (
        <Container>
            <Loading isLoading={mutation.isPending}>
                <Row style={{ gap: '15px' }} >
                    {/* Left Section */}
                    <LeftSection span={15}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ fontWeight: '560' }}> <PayCircleOutlined /> Chọn phương thức giao hàng</p>
                            <Radio.Group
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9' // Màu nền nhạt
                                }}
                                onChange={(e) => setValueDelivery(e.target.value)}
                                value={valueDelivery}
                            >
                                <Radio
                                    value={'save_delivery'}
                                    style={{
                                        padding: '5px 0',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Giao hàng tiết kiệm
                                </Radio>
                                <Radio
                                    value={'fast_delivery'}
                                    style={{
                                        padding: '5px 0',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Giao hàng hỏa tốc
                                </Radio>
                            </Radio.Group>

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p style={{ fontWeight: '560' }}><CarOutlined /> Chọn phương thức thanh toán</p>
                            <Radio.Group
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9' // Màu nền nhạt
                                }}
                                onChange={(e) => setValuePayment(e.target.value)}
                                value={valuePayment}
                            >
                                <Radio
                                    value={'cash'}
                                    style={{
                                        padding: '5px 0',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Thanh toán tiền mặt khi nhận hàng
                                </Radio>
                                <Radio
                                    value={'mobile_banking'}
                                    style={{
                                        padding: '5px 0',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Thanh toán qua ví điện tử
                                </Radio>
                            </Radio.Group>

                        </div>
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
                        <SummaryItem style={{ borderBottom: '1px solid grey', paddingBottom: '10px' }}>
                            <span>Phí giao hàng:</span>
                            <span>{(orderItems?.length <= 0 || listCheckedStore.length <= 0) ? '0 $' : `${calculateFeeShip()} $`}</span>
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
                        {listCheckedStore?.length <= 0 || orderItems?.length <= 0 ? <div style={{ display: 'block' }} />
                            :
                            <>
                                {valuePayment === 'mobile_banking' && sdkReady ?
                                    <div style={{ marginTop: '45px' }}>
                                        <PayPalButton
                                            amount={total}
                                            currency="USD"
                                            onSuccess={async (details, data) => {
                                                let data2 = {
                                                    orderItems: selectedItems,
                                                    email: user?.email,
                                                    fullName: user?.name,
                                                    address: user?.address,
                                                    city: user?.city,
                                                    phone: user?.phone,
                                                    paymentMethod: valuePayment,
                                                    itemsPrice: subtotal,
                                                    shippingPrice: calculateFeeShip(),
                                                    totalPrice: total,
                                                    user: user?._id,
                                                    isPaid: true,
                                                    paidAt: details?.update_time

                                                };
                                                await mutation.mutateAsync({ id: user?._id, ...data2 });
                                            }}
                                            onError={(error) => {
                                                console.error('PayPal Error:', error);
                                                alert('Transaction failed. Please ensure sufficient balance or try again.');
                                            }}
                                        />
                                    </div>
                                    :
                                    <Loading isLoading={false} >
                                        <Button type="primary" block
                                            style={{ marginTop: '50px', padding: '25px 0', background: 'rgb(255, 57, 69)', fontSize: '24px', marginBottom: '20px' }}
                                            onClick={() => handleOrder()}
                                        >
                                            Đặt hàng
                                        </Button>
                                    </Loading>
                                }
                            </>
                        }
                    </RightSection>
                </Row >
            </Loading>

        </Container >
    );
};

export default PaymentPage;
