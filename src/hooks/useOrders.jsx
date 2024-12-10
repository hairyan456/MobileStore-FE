import { useCallback, } from "react";
import { getAllOrders } from "../services/orderService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
    const fetchAllOrders = useCallback(async () => {
        try {
            const res = await getAllOrders();
            if (res?.EC === 0) {
                return res?.DT;
            } else {
                toast.warning(res?.EM);
                return [];
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching Orders');
            console.log(error);
        }
    }, []);

    // mỗi khi chuyển qua lại giữa các Tab, React Query sử dụng focus revalidation để đảm bảo dữ liệu của bạn luôn cập nhật.
    const { data: listOrders, isLoading, refetch: refetchOrders } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchAllOrders,
        retry: 3,        // Retry 3 times if the query fails
        retryDelay: 1000, // Delay 1 second between retries
        // refetchOnWindowFocus: false // Disable refetching on window focus
    });

    return {
        listOrders, isLoading, refetchOrders,
    };

}