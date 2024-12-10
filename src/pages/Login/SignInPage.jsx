import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperHeader, WrapperTextLight } from './style';
import { InputForm } from '../../components/Input';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { postLogin } from '../../services/userService';
import { useMutation } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { fetchDetailUser, updateUserInfo } from '../../redux/slices/userSlice';
import LayoutAuth from '../../layout/LayoutAuth';

const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = 'MobileStore - Sign In';
        if (localStorage.getItem("error_message_accessToken")) {
            toast.error(localStorage.getItem("error_message_accessToken"));
            localStorage.removeItem("error_message_accessToken");
        };

        return () => {
            setEmail('');
            setPassword('');
        };
    }, []);

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                const { access_token, refresh_token } = res.DT;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                const { _id } = jwtDecode(access_token);
                if (_id) {
                    const result = await dispatch(fetchDetailUser({ id: _id }));
                    if (fetchDetailUser.fulfilled.match(result)) {
                        dispatch(updateUserInfo({ ...result?.payload, access_token, refresh_token }));
                        toast.success('Login success');
                        mutation.reset();
                    }
                }
            } else {
                toast.error(res?.EM ?? 'Login failed!');
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const checkDisabledButton = () => {
        if (email.trim() || password.trim())
            return false;
        return true;
    }

    const validateForm = () => {
        const newErrors = {};

        // Kiểm tra email có được điền hay không
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Invalid email format.';
            }
        }

        // Kiểm tra password có được điền hay không
        if (!password.trim()) {
            newErrors.password = 'Password is required.';
        }

        // Cập nhật trạng thái lỗi
        setErrors(newErrors);

        // Trả về kết quả validate
        return Object.keys(newErrors).length === 0;
    };

    const submitLoginForm = async () => {
        if (validateForm())
            await mutation.mutateAsync({ valueLogin: email, password });
    };

    return (
        <LayoutAuth>
            <WrapperContainerLeft >
                <WrapperHeader>Welcome,</WrapperHeader>
                <p style={{ fontSize: '16px' }}>Sign in or Sign up</p>
                <Form onFinish={submitLoginForm}>
                    <div style={{ marginBottom: '10px' }}>
                        <InputForm
                            type="email"
                            placeholder="Type your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderColor: errors.email ? 'red' : undefined }}
                        />
                        {errors.email && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>{errors.email}</p>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <InputForm
                            type="password"
                            placeholder="Type password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            style={{ borderColor: errors.password ? 'red' : undefined }}
                        />
                        {errors.password && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>{errors.password}</p>}
                    </div>
                    <Loading isLoading={mutation.isPending} >
                        <ButtonComponent type={'submit'} disabled={checkDisabledButton()} text={'Sign in'} />
                    </Loading>
                </Form>
                <p><WrapperTextLight>Forgotten password?</WrapperTextLight> </p>
                <p style={{ margin: '0px' }}>Don't have an account? <WrapperTextLight onClick={() => navigate('/sign-up')}>Register</WrapperTextLight></p>
            </WrapperContainerLeft>
        </LayoutAuth>
    );
};

export default SignInPage;