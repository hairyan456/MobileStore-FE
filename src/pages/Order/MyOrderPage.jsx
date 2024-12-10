import { Button, Row, Col, Tag, Image } from 'antd';
import { format } from 'date-fns';
import { deleteOrder, getOrdersByUserId } from '../../services/orderService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { WrapperButtonStyle, WrapperCardStyle, WrapperHeading, WrapperListProducts } from './style';
import Loading from '../../components/Loading/Loading';
import React, { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';

const MyOrderPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.info);

    useEffect(() => {
        document.title = 'Order History Page';
        if (!params?.userId) {
            navigate('/');
            return;
        }
    }, []);

    const fetchOrdersByUserId = useCallback(async () => {
        if (!params?.userId) return null;
        try {
            const res = await getOrdersByUserId(params.userId);
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
    }, [params.userId]);

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['ordersByUser', params.userId],
        queryFn: fetchOrdersByUserId,
        retry: 3,        // Retry 3 times if the query fails
        retryDelay: 1000, // Delay 1 second between retries
        enabled: !!params.userId,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    const getStatusTag = (type, status) => {
        switch (status) {
            case false:
                return <Tag color="orange">{type === 'isDelivered' ? 'Chưa giao hàng' : 'Chưa thanh toán'}</Tag>;
            case true:
                return <Tag color="green">{type === 'isDelivered' ? 'Đã giao hàng' : 'Đã thanh toán'}</Tag>;
            default:
                return <Tag color="default">Trạng thái không xác định</Tag>;
        }
    };

    const mutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                Swal.fire("Cancel!", "Your order has been canceled.", "success");
                refetch();
            }
            else toast.error(res?.EM ?? 'Delete failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleCancelOrder = (orderId) => {
        if (!orderId) return;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await mutation.mutateAsync({ orderId, id: user?._id });
                } catch (error) {
                    console.error('Error during order cancellation:', error);
                    toast.error('Something went wrong. Please try again later.');
                }
            }
        });
    };

    const debouncedCancelOrder = debounce((orderId) => {
        handleCancelOrder(orderId);
    }, 300);

    if (!params?.userId)
        return null;
    return (
        <div style={{ padding: '25px 120px', background: '#efefef', width: '100%' }}>
            <WrapperHeading style={{ color: 'blue', textAlign: 'center' }}>Danh sách đơn hàng</WrapperHeading>
            <Loading isLoading={isLoading}>
                {!orders && !isLoading ? <></>
                    :
                    <Row gutter={50}>
                        {orders?.map(order => (
                            <Col style={{ marginBottom: '20px' }} span={8} key={order?._id}>
                                <WrapperCardStyle title={`Đơn hàng (${order?._id})`}>
                                    <p><strong>Ngày tạo: </strong>{format(new Date(order?.createdAt), 'dd/MM/yyyy - HH:mm')}</p>
                                    <p><strong>Trạng thái: </strong>{getStatusTag('isDelivered', order?.isDelivered)} {getStatusTag('isPaid', order?.isPaid)}</p>
                                    <p><strong>Tổng tiền: </strong>{order?.totalPrice} $</p>

                                    {/* Hiển thị chi tiết sản phẩm */}
                                    <WrapperListProducts  >
                                        <strong>Chi tiết:</strong>
                                        <ul >
                                            {order?.orderItems?.length > 0 && order.orderItems.map((productData, index) => (
                                                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '13px' }}>
                                                    <Image
                                                        src={productData?.image ?? ''}
                                                        style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                                                        alt="prod_image"
                                                    />
                                                    <span>  {productData?.name} x {productData?.amount}</span>
                                                    <span style={{ marginLeft: '10px' }}>Tạm tính: {productData?.amount * productData?.price} $</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </WrapperListProducts>

                                    <WrapperButtonStyle >
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() => debouncedCancelOrder(order?._id)}
                                        >
                                            Huỷ đơn hàng
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={() => navigate(`/order/detail/${order?._id}`)}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </WrapperButtonStyle>
                                </WrapperCardStyle>
                            </Col>
                        ))}
                    </Row>
                }

            </Loading>
        </div>
    );
};


export default MyOrderPage;
