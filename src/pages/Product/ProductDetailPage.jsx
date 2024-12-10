import React, { useEffect } from 'react';
import DetailProduct from '../../modules/Product/DetailProduct';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useProducts } from '../../hooks/useProducts';
import Alert from '../../components/Alert/Alert';
import Loading from '../../components/Loading/Loading';
import { Breadcrumb } from 'antd';

const ProductDetailPage = () => {
    const params = useParams();
    const { dataProduct, isLoadingDetail } = useProducts(params?.productId ?? '');

    useEffect(() => {
        document.title = `${dataProduct?.name ?? 'Detail product'}`;
    }, [dataProduct]);

    if (_.isEmpty(params?.productId))
        return null;
    return (
        <div style={{ width: '100%', padding: '30px 120px', background: '#efefef' }}>
            <Loading isLoading={isLoadingDetail}>
                {isLoadingDetail ? <div style={{ height: '500px' }} />
                    :
                    <>
                        {!_.isEmpty(dataProduct) ?
                            <>
                                <Breadcrumb items={[
                                    { title: <NavLink to="/">Home</NavLink> },
                                    { title: <NavLink to="#">Detail product</NavLink> }
                                ]} separator=">" />
                                <DetailProduct dataProduct={dataProduct} />
                            </>
                            :
                            <div style={{ height: '500px' }}>
                                <Alert isHeader={true} heading={`Oops! You've got an error`}>
                                    <p style={{ fontSize: '28px', color: 'grey' }}>
                                        Not found any product data
                                    </p>
                                </Alert>
                            </div>

                        }
                    </>
                }
            </Loading>
        </div>
    );
};

export default ProductDetailPage;