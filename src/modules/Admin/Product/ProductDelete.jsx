import React from 'react';
import ModalComponent from '../../../components/Modal/ModalComponent';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '../../../services/productService';

const ProductDelete = ({ productId = '', isModalOpen = false, setShowModal = () => { }, ...props }) => {
    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Delete product success');
                setShowModal(false);
                props?.refetchProducts();
            } else
                toast.error(res?.EM ?? 'Delete product failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleDelete = async () => {
        await mutation.mutateAsync(productId);
        mutation.reset();
    }

    if (!productId) return null;
    return (
        <ModalComponent
            title={'Modal delete product'}
            isModalOpen={isModalOpen}
            handleCancel={() => setShowModal(false)}
            handleOk={handleDelete}
        >
            <p>Do you want do delete product ? </p>
        </ModalComponent>
    );
};

export default ProductDelete;