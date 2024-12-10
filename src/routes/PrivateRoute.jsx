import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import Alert from '../components/Alert/Alert';
import _ from 'lodash';
import styled from 'styled-components';

const WrapperButton = styled.button`
    background-color: #fff;
    color: #79CCF2;
    border: none;
    padding: 10px 20px;
    font-size: 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #eee;
    }

    .icon {
        font-size: 1.5rem;
    }
`;

const PrivateRoute = ({ children = <></> }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector(state => state?.user?.info);

    if (_.isEmpty(userInfo) && !userInfo?._id) {
        return (
            <Alert isHeader={true} heading={`Oops! You've got an error`}>
                <p style={{ fontSize: '18px', color: 'grey' }}>You don't have permission to access this route. Please login first!</p>
                <WrapperButton onClick={() => navigate('/sign-in', { state: location.pathname })}>
                    <LoginOutlined className="icon" />
                    Sign in
                </WrapperButton>
            </Alert>
        )
    }
    else {
        if (location.pathname.startsWith('/system')) {
            if (userInfo?.isAdmin)
                return children;
            else {
                return (
                    <Alert isHeader={true} heading={`Oops! You've got an error!`}>
                        <p style={{ fontSize: '18px', color: 'grey' }}>
                            You don't have permission to access ADMIN page
                        </p>
                        <WrapperButton onClick={() => navigate('/')}>
                            <HomeOutlined className="icon" />
                            Go back
                        </WrapperButton>
                    </Alert>
                )
            }
        }
        else
            return children;
    }
}

export default PrivateRoute;