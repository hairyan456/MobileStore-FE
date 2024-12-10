import React from 'react';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import { useMutation } from '@tanstack/react-query';
import { deleteManyProducts } from '../../../services/productService';
import { toast } from 'react-toastify';

const UserDeleteMany = ({ arrUserIds = [], setProdIds = () => { }, ...props }) => {

    console.log(arrUserIds);
    const mutation = useMutation({
        mutationFn: deleteManyProducts,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Delete many users success');
                setProdIds([]);
                props?.refetchProducts();
            } else
                toast.error(res?.EM ?? 'Delete many users failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleDelete = async () => {
        await mutation.mutateAsync(arrUserIds);
        mutation.reset();
    }

    if (arrUserIds?.length <= 0)
        return <div style={{ width: '18%' }} />;
    return (
        <ButtonComponent text='Delete selected users' style={{ width: '18%' }} onClick={handleDelete} />
    );
};

export default UserDeleteMany;