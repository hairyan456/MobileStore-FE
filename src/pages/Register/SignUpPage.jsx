import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperHeader, WrapperTextLight } from '../Login/style';
import { InputForm } from '../../components/Input';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { useMutation } from '@tanstack/react-query';
import { postRegister } from '../../services/userService';
import Loading from '../../components/Loading/Loading';
import LayoutAuth from '../../layout/LayoutAuth';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = 'MobileStore - Sign Up';
        return () => {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName(''); setPhone('');
        };
    }, []);

    const mutation = useMutation({
        mutationFn: postRegister,
        onSuccess: (res) => {
            if (res?.EC === 0) {
                toast.success('Register success. Please login');
                mutation.reset();
            } else {
                toast.error(res?.EM ?? '');
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const checkDisabledButton = () => {
        if (email.trim() || password.trim() || confirmPassword.trim() || name.trim() || phone.trim())
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

        // Kiểm tra confirmPassword có được điền hay không
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Password & confirm password do not match.';
        }

        // Kiểm tra name có được điền hay không
        if (!name.trim()) {
            newErrors.name = 'Name is required.';
        }

        // Kiểm tra phone có được điền hay không
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        }

        // Cập nhật trạng thái lỗi
        setErrors(newErrors);

        // Trả về kết quả validate
        return Object.keys(newErrors).length === 0;
    };

    const submitRegisterForm = async () => {
        if (validateForm())
            mutation.mutateAsync({ name, email, password, phone });
    }

    return (
        <LayoutAuth>
            <WrapperContainerLeft >
                <WrapperHeader>Welcome,</WrapperHeader>
                <p style={{ fontSize: '16px' }}>Sign in or Sign up</p>
                <Form onFinish={submitRegisterForm}>
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
                            type="text"
                            placeholder="Type your name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ borderColor: errors.name ? 'red' : undefined }}
                        />
                        {errors.name && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>{errors.name}</p>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <InputForm
                            type="text"
                            placeholder="Type your phone..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ borderColor: errors.phone ? 'red' : undefined }}
                        />
                        {errors.phone && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>{errors.phone}</p>}
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
                    <div style={{ marginBottom: '10px' }}>
                        <InputForm
                            type="password"
                            placeholder="Type confirm password..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="confirm-password"
                            style={{ borderColor: errors.confirmPassword ? 'red' : undefined }}
                        />
                        {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0' }}>{errors.confirmPassword}</p>}
                    </div>
                    <Loading isLoading={mutation.isPending} >
                        <ButtonComponent type={'submit'} disabled={checkDisabledButton()} text={'Sign up'} />
                    </Loading>
                </Form>
                <p style={{ margin: '0px' }}>Already have an account? <WrapperTextLight onClick={() => navigate('/sign-in')}>Please login</WrapperTextLight></p>
            </WrapperContainerLeft>
        </LayoutAuth>
    );
};

export default SignUpPage;