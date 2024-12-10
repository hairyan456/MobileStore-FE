import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailOrder } from '../../services/orderService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Container, LeftSection, RightSection, SummaryItem, WrapperHeading } from './style';
import { Button, Col, Radio, Row } from 'antd';
import { PayCircleOutlined, CarOutlined, ProductOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import userOrderHistory from '../../hooks/useOrderHistory';
import OrderItem from '../../modules/Order/OrderItem';
import convertPrice from '../../utils/convertPrice';
import useOrderCalculations from '../../hooks/useOrderCalculate';

const OrderDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.info);

    useEffect(() => {
        document.title = 'Order detail Page';
        if (!params?.orderId) {
            navigate('/');
            return;
        }
    }, []);

    const fetchDetailOrder = useCallback(async () => {
        if (!params?.orderId) return null;
        try {
            const res = await getDetailOrder(params.orderId, user?._id);
            if (res?.EC === 0)
                return res?.DT;
            else {
                toast.warning(res?.EM);
                return null;
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching orders by user id!');
            console.log(error);
        }
    }, [params.orderId]);

    const { data, isLoading } = useQuery({
        queryKey: ['detailOrder', params.orderId],
        queryFn: fetchDetailOrder,
        enabled: !!params.orderId,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    const { deliveryMethod, paymentMethod, shippingPrice, itemsPrice, totalPrice } = userOrderHistory(data ?? {});
    const { discountTotal } = useOrderCalculations([], [], 0, data?.orderItems);
    const listChecked = data?.orderItems?.map(item => item?.product) ?? [];

    const handleDownload = useCallback(async () => {
        const element = document.getElementById('order-history-content'); // Chọn vùng nội dung cần in
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 }); // Tăng chất lượng hình ảnh
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width * 0.264583; // px to mm
        const imgHeight = canvas.height * 0.264583;

        const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;

        pdf.addImage(imgData, 'PNG', 0, 0, newWidth, newHeight);
        pdf.save(`my-order-${data?._id}.pdf`);
    }, []);

    if (!params?.orderId || !data) return null;
    return (
        <Container>
            <Row style={{ gap: '15px' }} id="order-history-content">
                {/* Left Section */}
                <LeftSection span={15}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontWeight: '560' }}> <PayCircleOutlined />  Phương thức giao hàng</p>
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
                        >
                            <Radio
                                checked={true}
                                style={{
                                    padding: '5px 0',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                {deliveryMethod}
                            </Radio>
                        </Radio.Group>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontWeight: '560' }}><CarOutlined />  Phương thức thanh toán</p>
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
                        >
                            <Radio
                                checked={true}
                                style={{
                                    padding: '5px 0',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                {paymentMethod}
                            </Radio>
                        </Radio.Group>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <p style={{ fontWeight: '560' }}><ProductOutlined /> Danh sách sản phẩm</p>
                        <Row gutter={20}
                            style={{ background: '#f9f9f9', borderRadius: '8px', padding: '20px', fontWeight: '550', border: '1px solid #ddd', }}
                        >
                            <Col span={10}>
                                <div>Tất cả ({`${data.orderItems?.length}`} sản phẩm)</div>
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
                        {data?.orderItems?.length > 0 &&
                            data.orderItems.map(item =>
                                <OrderItem key={item?.product} order={item} listChecked={listChecked} />
                            )
                        }
                    </div>

                </LeftSection>

                {/* Right Section */}
                <RightSection span={8}>
                    <WrapperHeading style={{ textAlign: 'center' }}>Thông tin người nhận</WrapperHeading>
                    <SummaryItem>
                        <span>Họ và tên:</span>
                        <span>{data.shippingAddress.fullName}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Số điện thoại:</span>
                        <span>{data.shippingAddress.phone}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Địa chỉ:</span>
                        <span>{data.shippingAddress.address}</span>
                    </SummaryItem>
                    <SummaryItem style={{ borderBottom: '1px solid grey', paddingBottom: '25px' }}>
                        <span>Thành phố:</span>
                        <span>{data.shippingAddress.city}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Tạm tính:</span>
                        <span>{convertPrice(itemsPrice) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Giảm giá:</span>
                        <span>{convertPrice(discountTotal) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Thuế VAT (8%):</span>
                        <span>{convertPrice(data?.taxPrice * (data?.itemsPrice - discountTotal)) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem >
                        <span>Phí giao hàng:</span>
                        <span>{convertPrice(shippingPrice) + ' $'}</span>
                    </SummaryItem>
                    <SummaryItem>
                        <span>Tổng tiền:</span>
                        <span style={{ color: 'rgb(255, 57, 69)', fontWeight: '550', fontSize: '30px' }}>
                            {convertPrice(totalPrice) + ' $'}
                        </span>
                    </SummaryItem>

                    <Button type="primary" block
                        style={{ padding: '20px 0', background: 'rgb(255, 57, 69)', fontSize: '20px' }}
                        onClick={handleDownload}
                    >
                        Download < CloudDownloadOutlined />
                    </Button>
                </RightSection>
            </Row >
        </Container >
    );
};

export default OrderDetailPage;