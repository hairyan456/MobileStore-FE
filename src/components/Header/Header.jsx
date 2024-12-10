import { Badge, Col, Image, Popover } from 'antd';
import { updateSearchProduct } from '../../redux/slices/productSlice.js';
import { InputSearch } from '../Input';
import { postLogout } from '../../services/userService.js';
import { toast } from 'react-toastify';
import { updateUserInfo } from '../../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, SearchOutlined, MobileOutlined } from '@ant-design/icons';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style.js';
import ButtonComponent from '../Button/ButtonComponent.jsx';
import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { persistor } from '../../redux/store.js';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.info);
    const order = useSelector(state => state.order);

    const [valueSearch, setValueSearch] = useState('');

    const mutation = useMutation({
        mutationFn: postLogout,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                persistor.pause();            // Tạm dừng Redux Persist
                localStorage.clear();        // Xóa toàn bộ localStorage
                await persistor.purge();    // Xóa dữ liệu của Redux Persist
                dispatch(updateUserInfo({ info: {}, access_token: '', refresh_token: '' }));
                navigate('/sign-in');
                toast.success(res?.EM ?? 'Logout success')
            } else
                toast.error(res?.EM ?? 'Logout failed!');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });
    const handleLogout = () => {
        mutation.mutateAsync({});
    };

    const popoverContentAccount = useMemo(() => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <ButtonComponent text={'Account'} onClick={() => { navigate('/user-profile') }} style={{ padding: '10px 15px', background: '#79CCF2' }} />
            {user?.isAdmin &&
                <ButtonComponent text={'System'} onClick={() => { navigate('/system/admin') }} style={{ padding: '10px 15px', background: '#fbc95d' }} />
            }
            <ButtonComponent text={'Log out'} onClick={handleLogout} style={{ padding: '10px 15px' }} />
        </div>
    ), [handleLogout]);

    const popoverContentCart = useMemo(() => (
        <ButtonComponent text={'My order'} onClick={(e) => { e.stopPropagation(); navigate(`/order/history/${user?._id}`) }}
            style={{ padding: '10px 15px', background: '#75a4f0' }} />
    ), [handleLogout]);

    const handleChangeInputSearch = useMemo(() =>
        _.debounce((inputValue) => {
            setValueSearch(inputValue)
        }, 350),
        []);

    const handleOnSearch = () => {
        dispatch(updateSearchProduct(valueSearch));
    }

    return (
        <div style={{ width: '100%', background: '#79ccf2', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader >
                <Col span={5} style={{ display: 'flex', gap: '10px' }}  >
                    <MobileOutlined style={{ fontSize: '23px', color: '#fff' }} />
                    <WrapperTextHeader onClick={() => navigate('/')}>Mobile Store</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <InputSearch
                        placeholder={'Type product name...'}
                        textButton={<SearchOutlined />}
                        size={'large'}
                        defaulvalue={valueSearch}
                        onChange={(e) => handleChangeInputSearch(e.target.value)}
                        onSearch={handleOnSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '50px', alignItems: 'center', justifyContent: 'center' }}>
                    <WrapperHeaderAccount>
                        {user?.avatar ?
                            <Image preview={false}
                                src={user.avatar}
                                style={{ height: '50px', width: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                alt="avatar"
                            />
                            : <UserOutlined style={{ fontSize: '30px' }} />
                        }
                        {user?._id ?
                            <Popover content={popoverContentAccount} placement={'bottom'}  >
                                <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>{user?.name ?? user?.email ?? 'User'}</span>
                            </Popover>
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                <WrapperTextHeaderSmall style={{ cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>
                                    Login/Register
                                </WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        }
                    </WrapperHeaderAccount>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate('/carts')}>
                        <Badge count={order?.orderItems?.length ?? 0} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff', marginRight: '5px' }} />
                        </Badge>
                        <Popover content={popoverContentCart} placement={'bottom'}  >
                            <WrapperTextHeaderSmall>Carts</WrapperTextHeaderSmall>
                        </Popover>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default React.memo(Header);