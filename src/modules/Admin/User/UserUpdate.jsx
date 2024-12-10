import React, { useEffect, useState } from 'react';
import DrawerComponent from '../../../components/Drawer/DrawerComponent';
import Loading from '../../../components/Loading/Loading';
import { Button, Form, Image } from 'antd';
import { InputForm } from '../../../components/Input';
import { WrapperUploadAvatar } from '../../../pages/Profile/style';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getBase64 } from '../../../utils/getBase64';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { putUpdateUser } from '../../../services/userService';

const UserUpdate = ({ dataUser = {}, isOpenDrawer = false, onClose = () => { }, ...props }) => {
    const [form] = Form.useForm(); // Tạo instance form để quản lý state
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUser) && isOpenDrawer === true) {
            form.setFieldsValue(dataUser);
            setAvatar(dataUser?.avatar);
        }
    }, [dataUser, isOpenDrawer]);

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setAvatar('');
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        if (fileList?.length <= 0)
            return;
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        // Cập nhật giá trị vào form
        setAvatar(file?.preview)
    };

    const mutation = useMutation({
        mutationFn: putUpdateUser,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Update user success');
                handleCancel();
                props?.refetchUsers();
            } else
                toast.error(res?.EM ?? 'Update user failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const onFinish = async (values) => {
        await mutation.mutateAsync({ id: dataUser?._id, data: { ...values, avatar } });
        mutation.reset();
    };

    if (_.isEmpty(dataUser))
        return null;
    return (
        <DrawerComponent title={`User's detail`} isOpen={isOpenDrawer} onClose={handleCancel} width={'40%'}>
            <Loading isLoading={mutation.isPending}>
                <Form
                    form={form} // Gắn instance form vào đây
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ email: '', name: '', phone: '', address: '', city: '' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <InputForm placeholder="Type your email..." disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type product name..." />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input phone!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type phone..." />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type address..." />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input city!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type city..." />
                    </Form.Item>

                    <Form.Item label="Avatar">
                        <WrapperUploadAvatar onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </WrapperUploadAvatar>
                        {avatar &&
                            <Image
                                src={avatar}
                                style={{ height: '75px', width: '75px', borderRadius: '50%', objectFit: 'cover', marginTop: '15px' }}
                                alt="avatar_prod"
                            />
                        }
                    </Form.Item>

                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit" style={{ padding: '20px', fontSize: '18px' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        </DrawerComponent >
    );
};

export default UserUpdate;