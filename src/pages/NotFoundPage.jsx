import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import Alert from '../components/Alert/Alert';

const HomeButton = styled.button`
    background-color: #fff;
    color: #721c24;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ddd;
    }

    .icon {
        font-size: 1.2rem;
    }
`;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <Alert heading={'Cannot found your URL page'}>
            <HomeButton onClick={handleNavigateHome}>
                <HomeOutlined className="icon" />
                Go to Home
            </HomeButton>
        </Alert>
    );
}

export default NotFoundPage;
