import React from 'react';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import { useMutation } from '@tanstack/react-query';
import { deleteManyProducts } from '../../../services/productService';
import { toast } from 'react-toastify';

const ProductDeleteMany = ({ arrProdIds = [], setProdIds = () => { }, ...props }) => {
    const mutation = useMutation({
        mutationFn: deleteManyProducts,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Delete many products success');
                setProdIds([]);
                props?.refetchProducts();
            } else
                toast.error(res?.EM ?? 'Delete many products failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleDelete = async () => {
        await mutation.mutateAsync(arrProdIds);
        mutation.reset();
    }

    if (arrProdIds?.length <= 0)
        return <div style={{ width: '18%' }} />;
    return (
        <ButtonComponent text='Delete selected products' style={{ width: '18%' }} onClick={handleDelete} />
    );
};

export default ProductDeleteMany;