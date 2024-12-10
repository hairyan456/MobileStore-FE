import React, { useEffect, useState } from 'react';
import DrawerComponent from '../../../components/Drawer/DrawerComponent';
import Loading from '../../../components/Loading/Loading';
import { Button, Form, Image } from 'antd';
import { InputForm } from '../../../components/Input';
import { WrapperUploadAvatar } from '../../../pages/Profile/style';
import { useMutation } from '@tanstack/react-query';
import { putUpdateProduct } from '../../../services/productService';
import { toast } from 'react-toastify';
import { getBase64 } from '../../../utils/getBase64';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';

const ProductUpdate = ({ dataProduct = {}, isOpenDrawer = false, onClose = () => { }, ...props }) => {
    const [form] = Form.useForm(); // Tạo instance form để quản lý state
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataProduct) && isOpenDrawer === true) {
            form.setFieldsValue(dataProduct);
            setImage(dataProduct?.image);
        }
    }, [dataProduct, isOpenDrawer]);

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setImage('');
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        if (fileList?.length <= 0)
            return;
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        // Cập nhật giá trị vào form
        setImage(file?.preview)
    };

    const mutation = useMutation({
        mutationFn: putUpdateProduct,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Update product success');
                handleCancel();
                props?.refetchProducts();
            } else
                toast.error(res?.EM ?? 'Update product failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const onFinish = async (values) => {
        await mutation.mutateAsync({ id: dataProduct?._id, data: { ...values, image } });
        mutation.reset();
    };

    if (_.isEmpty(dataProduct))
        return null;
    return (
        <DrawerComponent title={`Product's detail`} isOpen={isOpenDrawer} onClose={handleCancel} width={'40%'}>
            <Loading isLoading={mutation.isPending}>
                <Form
                    form={form} // Gắn instance form vào đây
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type your name..." />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input type!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type product type..." />
                    </Form.Item>

                    <Form.Item
                        label="Count in stock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input count in stock!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type count in stock..." />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type price..." />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input rating!',
                            },
                        ]}
                    >
                        <InputForm placeholder="Type rating..." />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                    >
                        <InputForm placeholder="Type discount..." />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <InputForm placeholder="Type description..." />
                    </Form.Item>

                    <Form.Item label="Image">
                        <WrapperUploadAvatar onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </WrapperUploadAvatar>
                        {image &&
                            <Image
                                src={image}
                                style={{ height: '75px', width: '75px', borderRadius: '50%', objectFit: 'cover', marginTop: '15px' }}
                                alt="image_prod"
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

export default ProductUpdate;