import React from 'react';
import ModalComponent from '../../../components/Modal/ModalComponent';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../../services/userService';

const UserDelete = ({ userId = '', isModalOpen = false, setShowModal = () => { }, ...props }) => {
    
    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Delete user success');
                setShowModal(false);
                props?.refetchUsers();
            } else
                toast.error(res?.EM ?? 'Delete user failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleDelete = async () => {
        await mutation.mutateAsync(userId);
        mutation.reset();
    }

    if (!userId) return null;
    return (
        <ModalComponent
            title={'Modal delete user'}
            isModalOpen={isModalOpen}
            handleCancel={() => setShowModal(false)}
            handleOk={handleDelete}
        >
            <p>Do you want do delete user ? </p>
        </ModalComponent>
    );
};

export default UserDelete;