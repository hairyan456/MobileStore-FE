import { Button, Col, Image, InputNumber, Rate, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { WrapperAdressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addOrderProduct } from '../../redux/slices/orderSlice';
import convertPrice from '../../utils/convertPrice';
import LikePlugin from '../../components/Plugin/LikePlugin';
import CommentPlugin from '../../components/Plugin/CommentPlugin';

const DetailProduct = ({ dataProduct = {}, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.info);
    const [numProduct, setNumProduct] = useState(1);

    const handleButtonNumProduct = (type) => {
        if (type === 'plus') {
            setNumProduct(num => num + 1);
            return;
        }
        else if (type === 'minus') {
            setNumProduct(num => num - 1);
            return;
        }
        return;
    }

    const handleAddToCart = () => {
        if (!user?._id) {
            toast.warning('You must login first!');
            navigate('/sign-in', { state: location.pathname });
            return;
        }
        dispatch(addOrderProduct({
            orderItem: {
                name: dataProduct.name,
                amount: +numProduct,
                image: dataProduct.image,
                price: +dataProduct.price,
                discount: +dataProduct?.discount,
                product: dataProduct._id,
                countInStock: dataProduct?.countInStock
            }
        }));
    };

    if (!dataProduct)
        return null;
    return (
        <Row style={{ padding: '16px', backgroundColor: 'white', }}>
            <Col span={10} style={{ borderRight: '1px solid #ddd', paddingRight: '15px', borderRadius: '5px' }} >
                <Image width={'100%'} src={dataProduct.image ?? ''} alt='main_img_product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4} >
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='https://salt.tikicdn.com/cache/100x100/ts/product/3b/aa/7b/a41a7887c67b0dcda4f7338e6440c7b0.jpg.webp'
                            alt='small_img_product' />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '15px' }}>
                <WrapperStyleNameProduct>
                    {dataProduct?.name} <span style={{ color: 'red' }}>{dataProduct?.countInStock === 0 ? 'Đã hết hàng' : ''}</span>
                </WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={dataProduct?.rating} />
                    <WrapperStyleTextSell> | {`Sold ${dataProduct.sold ?? 0} +`}</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        {convertPrice(dataProduct?.price) + ' $'}
                        <span style={{ marginLeft: '20px', color: 'red', fontSize: '18px' }}>{dataProduct?.discount ? `-${dataProduct.discount * 100} %` : ''}</span>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAdressProduct>
                    <span>Giao đến </span>
                    <span className='address'>{`${user?.address ?? ''}`}</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAdressProduct>
                <LikePlugin
                    style={{ marginTop: '20px' }}
                    dataHref={import.meta.env.VITE_APP_IS_LOCAL ? `https://developers.facebook.com/docs/plugins` : window.location.href}
                />
                <div style={{
                    margin: '20px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd',
                    padding: '10px 0'
                }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <WrapperQuantityProduct>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleButtonNumProduct('minus')} />
                            <InputNumber
                                min={1}
                                value={numProduct}
                                onChange={(value) => setNumProduct(value)} />
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleButtonNumProduct('plus')} />
                        </WrapperQuantityProduct>
                        <span style={{ fontSize: '15px' }}>{`(Còn ${dataProduct?.countInStock ?? 0} sản phẩm)`}</span>
                    </div>
                    {(numProduct > dataProduct?.countInStock) && (
                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                            Số lượng không được vượt quá số lượng tồn kho!
                        </div>
                    )}

                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Button
                        style={{
                            background: 'rgb(255,57,69)', color: '#fff', fontSize: '18px',
                            padding: '30px 70px', border: 'none', fontWeight: '500'
                        }}
                        disabled={(numProduct > dataProduct.countInStock) || numProduct <= 0}
                        onClick={handleAddToCart}>
                        Chọn mua
                    </Button>
                    <Button style={{
                        background: '#fff', color: 'rgb(13,92,182)', fontSize: '18px',
                        padding: '30px 70px', border: '1.2px solid rgb(13,92,182)', fontWeight: '500'
                    }}>
                        Mua trả sau
                    </Button>
                </div>
            </Col>
            <CommentPlugin
                dataHref={import.meta.env.VITE_APP_IS_LOCAL ? `https://developers.facebook.com/docs/plugins/comments#configurator` : window.location.href}
                width={1240}
            />
        </Row>
    );
};

export default DetailProduct;