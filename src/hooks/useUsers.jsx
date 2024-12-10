import { useCallback, useState } from "react";
import { getAllUsers, getDetailUser } from "../services/userService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    const [userId, setUserId] = useState('');

    const fetchAllUsers = useCallback(async () => {
        try {
            const res = await getAllUsers();
            if (res?.EC === 0) {
                return res?.DT;
            } else {
                toast.warning(res?.EM);
                return [];
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching Users');
            console.log(error);
        }
    }, []);

    // mỗi khi chuyển qua lại giữa các Tab, React Query sử dụng focus revalidation để đảm bảo dữ liệu của bạn luôn cập nhật.
    const { data: listUsers, isLoading, refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: fetchAllUsers,
        retry: 3,        // Retry 3 times if the query fails
        retryDelay: 1000, // Delay 1 second between retries
        // refetchOnWindowFocus: false // Disable refetching on window focus
    });

    const fetchDetailUser = useCallback(async (id) => {
        if (!id) return null;
        try {
            const res = await getDetailUser(id);
            if (res?.EC === 0)
                return res?.DT;
            else {
                toast.warning(res?.EM);
                return null;
            }
        } catch (error) {
            toast.error(error?.message ?? 'Failed while fetching detail user');
            console.log(error);
        }
    }, []);

    const { data: dataUser, isLoading: isLoadingDetail } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchDetailUser(userId),
        enabled: !!userId, // Chỉ chạy khi `userId` có giá trị
        refetchOnWindowFocus: false
    });

    return {
        listUsers,
        isLoading,
        refetchUsers,
        dataUser,
        setUserId,
        isLoadingDetail
    };

}