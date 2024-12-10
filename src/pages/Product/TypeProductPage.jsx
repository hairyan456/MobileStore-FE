import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CardComponent from '../../components/Card/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperPagination, WrapperProducts, WrapperTypeProductPage } from './style';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { getProductsByType } from '../../services/productService';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductTypes, updateSearchProduct } from '../../redux/slices/productSlice';

const TypeProductPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { productTypes, searchProduct } = useSelector(state => state.product);
    const [statePaginate, setStatePaginate] = useState({
        currentPage: 1,
        limit: 5,
    });

    useEffect(() => {
        if (params?.productType) {
            document.title = `${params.productType} products`;
            if (productTypes?.length <= 0)
                dispatch(fetchAllProductTypes({}));
        }

        return () => { // chạy vào cleanup khi: dependecy thay đổi, umount component
            if (searchProduct)
                dispatch(updateSearchProduct(''));
            setStatePaginate({
                currentPage: 1,
                limit: 5,
            });
        };
    }, [params?.productType, searchProduct]);


    const fetchProductsByType = useCallback(async (page, limit, filter, prodType) => {
        if (!prodType) return null;
        try {
            const res = await getProductsByType(page, limit, filter, prodType);
            if (res?.EC === 0)
                return res?.DT;
            else {
                toast.warning(res?.EM);
                return null;
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching detail prod');
            console.log(error);
        }
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ['productsType', params.productType, statePaginate.currentPage, searchProduct],
        queryFn: () => fetchProductsByType(+statePaginate.currentPage, +statePaginate.limit, searchProduct, params.productType),
        enabled: !!params.productType,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    const onChangePaginate = (current, pageSize) => {
        setStatePaginate({ ...statePaginate, currentPage: current });
    };

    if (_.isEmpty(params?.productType))
        return null;
    return (
        <WrapperTypeProductPage>
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <Loading isLoading={isLoading}>
                    <Row style={{ flexWrap: 'nowrap', gap: '15px', height: '100%', padding: '30px 0' }}>
                        <WrapperNavbar span={4}>
                            <Navbar data={productTypes} />
                        </WrapperNavbar>
                        <Col span={20} >
                            <WrapperProducts>
                                {data?.listProducts?.length > 0 && data.listProducts.map((item, index) => (
                                    <CardComponent key={item._id} prodId={item._id} name={item?.name}
                                        rating={item?.rating} image={item?.image}
                                        price={item?.price?.toLocaleString()}
                                        discount={item?.discount} sold={item?.sold} countInStock={item?.countInStock} />
                                ))}
                            </WrapperProducts>
                            {data?.listProducts?.length > 0 &&
                                <WrapperPagination>
                                    <Pagination
                                        defaultCurrent={statePaginate.currentPage}
                                        total={(statePaginate.currentPage === 1 && data.listProducts.length < statePaginate.limit) ? data.listProducts.length : data?.totalRows}
                                        pageSize={statePaginate.limit}
                                        onChange={onChangePaginate}
                                    />
                                </WrapperPagination>
                            }
                        </Col>
                    </Row>
                </Loading>
            </div>
        </WrapperTypeProductPage>
    );
};

export default TypeProductPage;