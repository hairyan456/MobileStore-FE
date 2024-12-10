import React, { useCallback, useEffect } from 'react';
import TypeProducts from '../../modules/Product/TypeProducts';
import { WrapperButtonMore, WrapperHomePageBody, WrapperProducts, WrapperTypeProduct } from './style';
import SliderComponent from '../../components/Slider/SliderComponent';
import slide1 from '../../assets/images/slider-1.png';
import slide2 from '../../assets/images/slider-2.png';
import slide3 from '../../assets/images/slider-3.png';
import slide4 from '../../assets/images/slider-4.png';
import CardComponent from '../../components/Card/CardComponent';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductTypes, updateLimit, updateListProducts, updateSearchProduct } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { getProductsByCondition } from '../../services/productService';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
    const { listProducts, limit, productTypes, searchProduct } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'MobileStore - HomePage';
        if (productTypes.length <= 0)
            dispatch(fetchAllProductTypes({}));

        return () => {
            dispatch(updateSearchProduct(''));
        }
    }, []);

    const fetchAllProducts = useCallback(async (context) => {
        try {
            const res = await getProductsByCondition('', +context?.queryKey[1], '', searchProduct, 'name');
            if (res?.EC === 0) return res?.DT;
            else {
                toast.warning(res?.EM);
                return [];
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching Products');
            console.log(error);
        }
    }, [searchProduct]);

    // mỗi khi chuyển qua lại giữa các Tab, React Query sử dụng focus revalidation để đảm bảo dữ liệu của bạn luôn cập nhật.
    const { data, isLoading: isLoadingAPI } = useQuery({
        queryKey: ['products', limit, searchProduct],
        queryFn: fetchAllProducts,
        retry: 3,           // Retry 3 times if the query fails
        retryDelay: 1000,  // Delay 1 second between retries
        refetchOnWindowFocus: false, // Disable refetching on window focus
        enabled: !!limit && ![0].includes(limit),
        keepPreviousData: true
    });

    useEffect(() => {
        if (data?.listProducts)
            dispatch(updateListProducts(data.listProducts));
    }, [data?.listProducts]);

    return (
        <div style={{ width: '100%' }}>
            <WrapperTypeProduct>
                {productTypes?.length > 0 && productTypes.map(item => (<TypeProducts name={item} key={item} />))}
            </WrapperTypeProduct>

            <WrapperHomePageBody>
                <div id='container' style={{ width: '1270px', padding: '25px 0', margin: '0 auto' }}>
                    <SliderComponent images={[slide1, slide2, slide3, slide4]} />
                    {searchProduct &&
                        <div style={{
                            margin: '30px 0',
                            fontSize: '18px',
                            fontWeight: '400',
                            textTransform: 'uppercase'
                        }}>
                            <b> {listProducts?.length}</b> products found
                        </div>
                    }
                    <Loading isLoading={isLoadingAPI}>
                        <WrapperProducts>
                            {listProducts?.length > 0 && listProducts.map((item, index) => (
                                <CardComponent key={item._id} prodId={item._id} name={item?.name}
                                    rating={item?.rating} image={item?.image}
                                    price={item?.price}
                                    discount={item?.discount} sold={item?.sold} countInStock={+item?.countInStock} />
                            ))}
                        </WrapperProducts>
                    </Loading>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <WrapperButtonMore hidden={isLoadingAPI || +data?.totalRows === listProducts?.length}
                            onClick={() => dispatch(updateLimit(6))}>
                            Load more
                        </WrapperButtonMore>
                    </div>
                </div>
            </WrapperHomePageBody>
        </div>

    );
};

export default HomePage;