import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperProfilePage, WrapperUploadAvatar } from './style';
import { InputForm } from '../../components/Input';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { putUpdateUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { updateUserInfo } from '../../redux/slices/userSlice';
import Loading from '../../components/Loading/Loading';
import { Button, Image } from 'antd';
import { getBase64 } from '../../utils/getBase64';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const user = useSelector(state => state.user.info);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState(user?.name ?? '');
    const [phone, setPhone] = useState(user?.phone ?? '');
    const [address, setAddress] = useState(user?.address ?? '');
    const [city, setCity] = useState(user?.city ?? '');
    const [avatar, setAvatar] = useState(user?.avatar ?? '');

    useEffect(() => {
        document.title = 'MobileStore - User Profile';

        return () => {
            setName(''); setPhone(''); setAddress(''); setAvatar('');
        };
    }, []);

    const mutation = useMutation({
        mutationFn: putUpdateUser,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                dispatch(updateUserInfo({ ...res?.DT, access_token: localStorage.getItem('access_token') }));
                toast.success(res?.EM ?? 'Update success');
                if (location?.state)
                    navigate(location.state);
            } else 
                toast.error(res?.EM ?? 'Update user info failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleUpdateInfo = async () => {
        await mutation.mutateAsync({ id: user._id, data: { name, phone, address, city, avatar } });
        mutation.reset();
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        if (fileList?.length <= 0)
            return;
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file?.preview)
    };

    if (_.isEmpty(user) || !user?._id)
        return null;
    return (
        <WrapperProfilePage>
            <WrapperHeader>User's Information</WrapperHeader>
            <Loading isLoading={mutation.isPending}>
                <WrapperContentProfile>
                    <WrapperInput >
                        <WrapperLabel>Email</WrapperLabel>
                        <InputForm
                            value={user?.email ?? ''}
                            style={{ width: '80%', fontWeight: '700' }}
                            disabled={true}
                        />
                    </WrapperInput>

                    <WrapperInput >
                        <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                        <InputForm
                            id={'name'} placeholder="Type your name..." value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '80%' }}
                        />
                    </WrapperInput>

                    <WrapperInput >
                        <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                        <InputForm
                            id={'phone'} placeholder="Type your phone..." value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ width: '80%' }}
                        />
                    </WrapperInput>

                    <WrapperInput >
                        <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                        <InputForm
                            id={'address'} placeholder="Type your address..." value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ width: '80%' }}
                        />
                    </WrapperInput>

                    <WrapperInput >
                        <WrapperLabel style={{ marginRight: '23px' }} htmlFor='city'>City</WrapperLabel>
                        <InputForm
                            id={'city'} placeholder="Type your city..." value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: '80%' }}
                        />
                    </WrapperInput>

                    <WrapperInput >
                        <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                        <WrapperUploadAvatar onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </WrapperUploadAvatar>
                        {avatar &&
                            <Image
                                src={avatar}
                                style={{ height: '75px', width: '75px', borderRadius: '50%', objectFit: 'cover' }}
                                alt="avatar"
                            />
                        }
                    </WrapperInput>
                    <ButtonComponent text={'Update'} onClick={handleUpdateInfo}
                        style={{
                            color: 'rgb(26,148,255)', backgroundColor: '#f8f0e0', border: '1px solid #ccc',
                            width: '100%', padding: '23px 0'
                        }}
                    />
                </WrapperContentProfile>
            </Loading>
        </WrapperProfilePage>
    );
};

export default ProfilePage;




