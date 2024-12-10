import React from 'react';
import styled from 'styled-components';

// Styled component
const ErrorContainer = styled.div`
    color: #b91c1c; /* Màu đỏ */
    background-color: #fee2e2; /* Nền đỏ nhạt */
    border-radius: 8px;
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
`;

const ErrorComponent = () => {
    return (
        <ErrorContainer>
            Looks like component is error
        </ErrorContainer>
    );
};

export default ErrorComponent;
