import { useCallback, useState } from "react";
import { getAllProducts, getDetailProduct } from "../services/productService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (inputProdId) => {
    const [productId, setProductId] = useState('');

    const fetchAllProducts = useCallback(async () => {
        try {
            const res = await getAllProducts();
            if (res?.EC === 0) {
                return res?.DT;
            } else {
                toast.warning(res?.EM);
                return [];
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching Products');
            console.log(error);
        }
    }, []);

    // mỗi khi chuyển qua lại giữa các Tab, React Query sử dụng focus revalidation để đảm bảo dữ liệu của bạn luôn cập nhật.
    const { data: listProducts, error, isLoading, refetch: refetchProducts } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
        retry: 3,        // Retry 3 times if the query fails
        retryDelay: 1000, // Delay 1 second between retries
        // refetchOnWindowFocus: false // Disable refetching on window focus
        enabled: !inputProdId,
    });

    const fetchDetailProduct = useCallback(async (id) => {
        if (!id) return null;
        try {
            const res = await getDetailProduct(id);
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

    const { data: dataProduct, isLoading: isLoadingDetail } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchDetailProduct(productId || inputProdId),
        enabled: !!productId || !!inputProdId, // Chỉ chạy khi `productId` có giá trị
        refetchOnWindowFocus: false
    });

    return {
        listProducts,
        isLoading,
        refetchProducts,
        dataProduct,
        setProductId,
        isLoadingDetail
    };

}